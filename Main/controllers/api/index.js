const router = require('express').Router();
const userRoutes = require('./userLoginRoutes');

router.use('/users', userRoutes);

module.exports = router;
