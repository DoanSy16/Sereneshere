'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      parent_post_id: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      date_post: {
        type: Sequelize.DATE
      },
      hash_tag: {
        type: Sequelize.STRING
      },
      post_provinces_id: {
        type: Sequelize.STRING
      },
      post_districts_id: {
        type: Sequelize.STRING
      },
      post_wards_id: {
        type: Sequelize.STRING
      },
      send_status: {
        type: Sequelize.BOOLEAN
      },
      post_status: {
        type: Sequelize.BOOLEAN
      },
      product: {
        type: Sequelize.STRING
      },
      ban: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};