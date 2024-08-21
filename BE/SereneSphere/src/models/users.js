'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class User extends Model {
    static associate (models) {
      // Xác định các mối quan hệ ở đây nếu cần
      User.belongsToMany(models.Role, {through: models.UserRole,foreignKey: 'user_id'});
      User.hasMany(models.Post,{foreignKey:'user_id'});
      User.hasMany(models.Follow, { foreignKey: 'user_id', as: 'Followers' }); // Người dùng có nhiều người theo dõi
      User.hasMany(models.Follow, { foreignKey: 'follower_id', as: 'Following' }); // Người dùng theo dõi nhiều người khác
      User.hasMany(models.Comment,{foreignKey:'user_id'});
      User.hasMany(models.Search,{foreignKey:'user_id'})
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    intro: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    day_create: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_provinces_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    user_districts_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    user_wards_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    thumb: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    online_last_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ban: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gg_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fb_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Đảm bảo tên bảng đúng
    timestamps: false, // Nếu bạn không muốn Sequelize quản lý timestamps
    freezeTableName: true
  })

  return User
}
