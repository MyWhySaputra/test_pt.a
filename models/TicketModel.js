const Sequelize = require("sequelize");
const db = require("../config/Database_MySQL");
const Users = require("./UserModel.js");

const { DataTypes } = Sequelize;

const Tickets = db.define(
  "ticket",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Tickets);
Tickets.belongsTo(Users, { foreignKey: "user_id" });

module.exports = Tickets;
