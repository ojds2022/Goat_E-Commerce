const router = require('express').Router();
const { Product } = require('../../models');

router.post('/:id',  async (req, res) => {
    try { 
      Product.build({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productUrl: req.body.productUrl,
        productPrice: req.body.productPrice,
      });
      const test = await Product.findAll();
      const testData = test.map((project) => project.get({ plain: true }))
      console.log(testData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;