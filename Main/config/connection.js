const Sequelize = require('sequelize');
// require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize("mysql://hr3628rpuym7my35:uuy8f2t9xl8yknpe@lolyz0ok3stvj6f0.cbetxkdyhwsb.us-east-1.rds.amazonaw");
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
