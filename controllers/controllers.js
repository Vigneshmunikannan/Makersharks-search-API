const Supplier = require('../datamodels/SupplierModel');

exports.querySuppliers = async (req, res) => {
    const { location, nature_of_business, manufacturing_processes, limit = 10, page = 1 } = req.body;

    try {
        const suppliers = await Supplier.find({
            location: location,
            nature_of_business: nature_of_business,
            manufacturing_processes: { $in: manufacturing_processes }
        })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        const count = await Supplier.countDocuments({
            location: location,
            nature_of_business: nature_of_business,
            manufacturing_processes: { $in: manufacturing_processes }
        });

        res.status(200).json({
            suppliers,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving suppliers.' });
    }
};
