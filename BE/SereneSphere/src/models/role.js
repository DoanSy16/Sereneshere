'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Role.belongsToMany(models.User, {through: models.UserRole,foreignKey: 'role_id'})
    }
  }
  Role.init({
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    role_des: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles', // Đảm bảo tên bảng đúng
    timestamps: false, // Nếu bạn không muốn Sequelize quản lý timestamps
    freezeTableName: true
  })
  return Role
}
