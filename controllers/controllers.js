const { body, validationResult } = require('express-validator');
const sanitize = require('mongo-sanitize');
const Supplier = require('../datamodels/SupplierModel');

exports.querySuppliers = [
    // Input validation and sanitization
    body('location').optional().trim().escape(),
    body('nature_of_business').optional().trim().isIn(['small_scale', 'medium_scale', 'large_scale']),
    body('manufacturing_processes').optional().isArray().custom((processes) => {
        return processes.every((process) =>
            ['moulding', '3d_printing', 'casting', 'coating'].includes(process)
        );
    }),
    body('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    body('page').optional().isInt({ min: 1 }).toInt(),

    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Initialize query object
        let query = {};

        // Add filters conditionally
        if (req.body.location) {
            query.location = sanitize(req.body.location);
        }
        if (req.body.nature_of_business) {
            query.nature_of_business = sanitize(req.body.nature_of_business);
        }
        if (req.body.manufacturing_processes && req.body.manufacturing_processes.length > 0) {
            query.manufacturing_processes = { $in: sanitize(req.body.manufacturing_processes) };
        }

        const limit = sanitize(req.body.limit || 10);
        const page = sanitize(req.body.page || 1);

        try {
            // Query the suppliers with the dynamic query object
            const suppliers = await Supplier.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            // Get the total count for pagination
            const count = await Supplier.countDocuments(query);

            // Respond with the results and pagination data
            res.status(200).json({
                suppliers,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (err) {
            // Handle any errors that occur during the query
            res.status(500).json({ message: err.message || 'Some error occurred while retrieving suppliers.' });
        }
    }
];
