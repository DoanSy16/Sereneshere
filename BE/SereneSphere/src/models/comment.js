'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User,{foreignKey:'user_id'});
      Comment.hasMany(models.Comment,{foreignKey:'parent_comment_id',as :'childComments'});
      Comment.belongsTo(models.Comment,{foreignKey:'parent_comment_id',as:'parentComments'})
      Comment.belongsTo(models.Post,{foreignKey:'post_id'});
    }
  }
  Comment.init({
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    user_id: DataTypes.INTEGER,
    parent_comment_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    date_comment: DataTypes.DATE,
    content: DataTypes.STRING,
    comment_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Comment',
    tableName:'comment',
    freezeTableName:true
  });
  return Comment;
};