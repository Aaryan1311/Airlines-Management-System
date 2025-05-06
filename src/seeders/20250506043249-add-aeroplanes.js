'use strict';
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Aeroplanes', [
      {
         modelNumber: 'airbus 340',
         capacity: 450,
         createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        modelNumber: 'boeing 747',
        capacity: 500,
        createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        modelNumber: 'boeing 777',
        capacity: 600,
        createdAt: new Date(),
       updatedAt: new Date()
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Aeroplanes', 
    {
      [Op.or]: [
        { modelNumber: 'airbus 340' },
        { modelNumber: 'boeing 747' },
        { modelNumber: 'boeing 777' }
    ]
  }, {});
  
  }
};
