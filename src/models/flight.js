'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Aeroplane, {
        foreignKey: 'aeroplaneId',
        onDelete: 'CASCADE',
        as: 'aeroplaneDetails',
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportCode',
        onDelete: 'CASCADE',
        as: 'departureAirport',
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportCode',
        onDelete: 'CASCADE',
        as: 'arrivalAirport',
      });
    }
  }
  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    aeroplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureAirportCode:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalAirportCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardingGate:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};