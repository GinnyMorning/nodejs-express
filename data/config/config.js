// eslint-disable-next-line no-unused-vars
const fs = require('fs');

module.exports = {
  development: {
    username: 'postgres',
    password: 'mypostgres',
    database: 'mydb',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '',
    port: '',
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
