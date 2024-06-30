'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{foreignKey:'user_id'});
      Post.hasMany(models.PostImages,{foreignKey:'post_id'});
      Post.hasMany(models.Post, { foreignKey: 'parent_post_id', as: 'childPosts' });
      Post.belongsTo(models.Post, { foreignKey: 'parent_post_id', as: 'parentPost' });
      Post.hasMany(models.Comment,{foreignKey:'post_id'});
    }
  }
  Post.init({
    post_id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    user_id: DataTypes.INTEGER,
    parent_post_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    date_post: DataTypes.DATE,
    hash_tag: DataTypes.STRING,
    post_provinces_id: DataTypes.STRING,
    post_districts_id: DataTypes.STRING,
    post_wards_id: DataTypes.STRING,
    send_status: DataTypes.BOOLEAN,
    post_status: DataTypes.BOOLEAN,
    product: DataTypes.STRING,
    ban: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post',
    tableName:'post',
    freezeTableName:true
  });
  return Post;
};