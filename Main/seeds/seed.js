const sequelize = require('../config/connection');
const { Items } = require('../models');
const seedProduct = require('./productData');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedProduct();

  await Items.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();