const router = require('express').Router();
const { Product } = require('../models');

router.post('/product/:id',  async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id);
      const Products = project.get({ plain: true });
  
      res.render('product-details', {
        Products
      });
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;