const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATBASE_URL || 'postgres://localhost:5432/acme_store',
  { logging: false }
);

module.exports = db;
