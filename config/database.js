const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports =  new Sequelize(
// 'postgres://postgres:123456@localhost:5432/codegig'
'codegig',
'postgres',
'task#123',
{
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
}
);
