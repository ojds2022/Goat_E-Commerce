const router = require('express').Router();
const productDetailRoutes = require('./productDetailRoutes');

router.use('/product', productDetailRoutes);

module.exports = router;
