const sequelize = require('../config/connection');
const { Items } = require('../models');
const { User } = require('../models');

const userData = require('./userData.json');
const userData = require('./userLogin.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Items.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

const seedDatabaseUserLogin = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
seedDatabaseUserLogin();
