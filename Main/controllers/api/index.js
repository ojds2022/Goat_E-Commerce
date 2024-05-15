const router = require('express').Router();
const productDetailRoutes = require('./productDetailRoutes');

router.use('/productDetailRoutes', productDetailRoutes);

module.exports = router;
