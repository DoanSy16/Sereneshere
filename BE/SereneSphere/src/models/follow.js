'use strict';
const { Model } = require('sequelize');
// const User = require('./users'); // Đảm bảo đường dẫn đúng đến mô hình User

module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      // Thiết lập mối quan hệ giữa Follow và User
      Follow.belongsTo(models.User, { foreignKey: 'user_id' });
      Follow.belongsTo(models.User, { foreignKey: 'follower_id', as: 'Follower' });
    }
  }

  Follow.init({
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users', // Tên bảng users trong cơ sở dữ liệu
        key: 'user_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User', // Tên bảng users trong cơ sở dữ liệu
        key: 'user_id'
      }
    },
    date_follow: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Follow',
    tableName: 'follower', // Đảm bảo tên bảng đúng
    timestamps: false,
    freezeTableName: true
  });

  return Follow;
};
