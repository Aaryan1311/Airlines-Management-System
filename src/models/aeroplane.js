'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aeroplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, {
        foreignKey: 'aeroplaneId',
        onDelete: 'CASCADE',
      });
    }
  }
  Aeroplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9 ]+$/,
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 1000,
        isInt: true,
        min: 1,
      },
    }
  }, {
    sequelize,
    modelName: 'Aeroplane',
  });
  return Aeroplane;
};