const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const productDetailRoutes = require('./productDetailRoutes')

router.use('/', homeRoutes);
router.use('/productDetailRoutes', productDetailRoutes);

module.exports = router;
