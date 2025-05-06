// { this used to be a json file, now is a js file. old structure:
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

require('dotenv').config();

console.log({
  user: process.env.ADMIN_USERNAME,
  pass: process.env.ADMIN_PASSWORD,
  db: process.env.DATABASE_NAME,
  host: process.env.HOST,
  port: process.env.DB_PORT
});


module.exports = {
  development: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};

