const router = require('express').Router();
const { Product, Customer } = require('../models');

router.get('/',  async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: [['product_name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));
    const customerData = await Customer.findAll({
      order: [['customer_id', 'ASC']],
    });
    const Customers = customerData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      Products,
      Customers
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/products',  async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: [['product_name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));
    const customerData = await Customer.findAll({
      order: [['customer_id', 'ASC']],
    });
    const Customers = customerData.map((project) => project.get({ plain: true }));

    res.render('products', {
      Products,
      Customers
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/product/:id',  async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);
    const Products = productData.get({ plain: true });

    const customerData = await Customer.findAll({
      order: [['customer_id', 'ASC']],
    });
    const Customers = customerData.map((project) => project.get({ plain: true }));

    res.render('product-details', {
      Products,
      Customers
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
