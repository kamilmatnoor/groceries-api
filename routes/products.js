var express = require('express');
var router = express.Router();

const Products = require('../controllers/products');

const { check, validationResult } = require('express-validator');

/* GET intial products routes. */
router.get('/', (req, res, next) => {
    const options = req.query;
    Products.get(options).then(response => {
        res.json(response);
    });
});

var validateGetById = [
    check('id')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Id is required')];

router.get('/:id', validateGetById, (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ error: true, message: "Failed validation", errors: errors.array(), data: {} });
    }
    Products.getById(req.params.id).then(response => {
        res.json(response);
    });
});


var validateCreate = [
    check('product_name')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Product Name is required'),
    check('product_brand')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Product Brand is required'),
    check('product_barcode')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Product Barcode is required'),
    check('product_barcode')
        .isNumeric()
        .withMessage('Product Barcode must be a number'),
    check('product_barcode').isLength({ min: 12, max: 12 }).withMessage('Product Barcode must be 12 digits of number')];

router.post("/", validateCreate, (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ error: true, message: "Failed validation", errors: errors.array(), data: {} });
    }

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
