const router = require('express').Router();
const { Product } = require('../models');


router.get('/',  async (req, res) => {
  try {
    const itemData = await Product.findAll({
      order: [['product_name', 'ASC']],
    });
    const Item = itemData.map((project) => project.get({ plain: true }));
    console.log(Item);
    res.render('homepage', {
      Item
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
