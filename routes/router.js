const express = require('express');
const router = express.Router();
const suppliers = require('../controllers/controllers');

router.post('/api/supplier/query', suppliers.querySuppliers);

module.exports = router;
