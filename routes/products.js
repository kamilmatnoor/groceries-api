var express = require('express');
var router = express.Router();

const Products = require('../controllers/products');

/* GET intial products routes. */
router.get('/', (req, res, next) => {
    Products.getAll().then(response => {
        res.json(response);
    });
});

module.exports = router;
