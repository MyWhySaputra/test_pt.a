const { Sequelize } = require("sequelize");
const { mysql2 } = require("mysql2");

// Database Local

// const db = new Sequelize("pta", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// const db = new Sequelize("db_exam5", "user_exam5", "@user_exam5", {
//   host: "34.101.79.44",
//   port: "3306",
//   dialect: "mysql",
//   dialectModule: mysql2,
// });

const db = new Sequelize(
  "bht1hxs8sfigu0blqiwl",
  "uzn8fjdmrugfrsis",
  "DB6DTu5osK7jU6VE8INf",
  {
    host: "bht1hxs8sfigu0blqiwl-mysql.services.clever-cloud.com",
    port: "3306",
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

module.exports = db;