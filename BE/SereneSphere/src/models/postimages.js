'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostImages.belongsTo(models.Post,{foreignKey:'post_id'})
    }
  }
  PostImages.init({
    post_images_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrementIdentity:true
    },
    post_id: DataTypes.INTEGER,
    link_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PostImages',
  });
  return PostImages;
};