const { Product } = require('../models');

const productdata = [
  {
    product_name: 'COMPLETE WEAR POWDER',
    product_description: 'MOIRA Complete Wear Powder Foundation is a buildable Medium to full coverage with a natural matte finish With Sodium Hyaluronate Allantoin Vegan Squalane Aloe Vera and Camellia Extract',
    product_url: 'https://joiaweb.s3-us-west-2.amazonaws.com/ItemImages/2159068_001_1.jpg',
    price: '120.00'
  },
  {
    product_name: 'MOIRA LOOSE SETTING POWDER',
    product_description: 'RANSLUCENT 2 - BANANA 3 - MEDIUM 4 - DEEP 5 - MEDIUM LIGHT 6 - LIGHT MOIRA Loose Setting Powder is a weightless powder that delivers a silky smooth matte finish Infused with Collagen and Vitamin E',
    product_url: 'https://joiaweb.s3-us-west-2.amazonaws.com/ItemImages/2053586_003_1.jpg',
    price: '200.00'
  },
  {
    product_name: 'MOIRA CHROMA LIGHT SHADOW',
    product_description: 'Get ready to elevate your eye game with Moira Chroma Light Shadow! This incredible product delivers a highly pigmented metallic finish with a foiled effect that is sure to turn heads',
    product_url: 'https://joiaweb.s3-us-west-2.amazonaws.com/ItemImages/2183902_004_1.jpg',
    price: '300.00'
  },
  {
    product_name: 'MOIRA STARSTRUCK CHROME LOOSE POWDER',
    product_description: 'Get ready to dazzle with MOIRA Starstruck Chrome Loose Powder This magical color-shifting powder turns any moment into a mesmerizing spectacle',
    product_url: 'https://joiaweb.s3-us-west-2.amazonaws.com/ItemImages/2180565_001_2.jpg',
    price: '400.00'
  },
];

const seedProduct = () => Product.bulkCreate(productdata);

module.exports = seedProduct;
