'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addConstraint('Airports', {
      type: 'foreign key',
      fields: ['cityId'],
      name: 'custom_fkey_cityId', // Custom name for the constraint
      references: {
        table: 'Cities',
        field: 'id'
  },
      onDelete: 'CASCADE'
    }
)},

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'custom_fkey_cityId');
    } 
};
