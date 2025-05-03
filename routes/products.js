var express = require('express');
var router = express.Router();

/* GET intial products routes. */
router.get('/', (req, res, next) => {
    res.json({
        message: "Success: Product"
    });
});

module.exports = router;
