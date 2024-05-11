const router = require('express').Router();
const { Product } = require('../models');

router.get('/products',  async (req, res) => {
    res.render('product-details')
});

module.exports = router;