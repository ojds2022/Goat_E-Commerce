const router = require('express').Router();


const productController = require('./productController');


const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const express = require('express');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
//global variable

router.use('/', productController);



module.exports = router;