const Sequelize = require("sequelize");

module.exports = new Sequelize("student", "postgres", "task#123", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false,
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
