const Sequelize = require('sequelize');
require('dotenv').config()
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(
    process.env.JAWSDB_URL,process.env.SESSION_SECRET = {secret: 'Super secret secret'}
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.SESSION_SECRET,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

const sess = {
  secret: 'Super goat secret',
  
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },

  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const sessionMiddleware = session(sess);

module.exports = {sequelize,sessionMiddleware};
