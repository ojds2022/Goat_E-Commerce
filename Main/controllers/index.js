const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
// const productDetailRoutes = require('./productDetailRoutes')


router.use('/', homeRoutes);
// router.use('/product', productDetailRoutes);


module.exports = router;
