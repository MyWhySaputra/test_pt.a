const Sequelize = require("sequelize");
const db = require("../config/Database_MySQL");
const Tickets = require("./TicketModel.js");

const { DataTypes } = Sequelize;

const WorkOrders = db.define(
  "work_order",
  {
    tiket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
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
    technician_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    technician_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

WorkOrders.belongsTo(Tickets, { foreignKey: "tiket_id" });

module.exports = WorkOrders;
