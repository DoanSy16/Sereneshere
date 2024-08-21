'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Search extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Search.belongsTo(models.User,{foreignKey:'user_id'});
    }
  }
  Search.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    id_login: DataTypes.INTEGER,
    id_user_search: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Search',
    tableName:'search',
    freezeTableName:true
  });
  return Search;
};