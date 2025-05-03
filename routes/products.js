var express = require('express');
var router = express.Router();

const Products = require('../controllers/products');

/* GET intial products routes. */
router.get('/', (req, res, next) => {
    Products.getAll().then(response => {
        res.json(response);
    });
});

router.get('/:id', (req, res, next) => {
    Products.getById(req.params.id).then(response => {
        res.json(response);
    });
});

router.post("/", (req, res, next) => {
    Products.create(req.body).then(response => {
        res.json(response);
    });
});

router.put("/:id", (req, res, next) => {
    Products.update(req.body, req.params.id).then(response => {
        res.json(response);
    });
});

router.delete("/:id", (req, res, next) => {
    Products.deleteProduct(req.params.id).then(response => {
        res.json(response);
    });
});

module.exports = router;
