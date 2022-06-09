const Sequelize = require("sequelize");
const db = require("../config/database");

const Gig = db.define("students", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  marks1: {
    type: Sequelize.INTEGER,
  },
  marks2: {
    type: Sequelize.INTEGER,
  },
  marks3: {
    type: Sequelize.INTEGER,
  },
});

Gig.sync().then(() => {
  console.log("table created");
});
module.exports = Gig;
