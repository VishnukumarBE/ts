'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Email',{
      id:{
         type:Sequelize.INTEGER,
         allowNull:false,
         primaryKey:true,
         autoIncrement:true
      },
      type:{
        type:Sequelize.ENUM("Welcome","ResetPassword","Invoice"),
        allowNull:false
      },
      subject:{
        type:Sequelize.STRING,
        allowNull:false
      },
      content:{
      type:Sequelize.TEXT,
       allowNull:false
    }
    },{
      timestamps:false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Email')
  }
};
