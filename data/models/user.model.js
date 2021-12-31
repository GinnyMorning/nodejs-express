const { DataTypes, Model } = require('sequelize');
const sequelizeTransforms = require('sequelize-transforms');
const bcrypt = require('bcryptjs');

const sequelize = require('../config/connectDatabase');
const { roles } = require('../../config/roles');

class User extends Model {
  /**
   * Check if email is taken
   * @param {string} email - The user's email
   * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
   * @returns {Promise<boolean>}
   */
  static isEmailTaken(email, excludeUserId) {
    const user = this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  }

  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  isPasswordMatch(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  }
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      trim: true,
      primaryKey: true,
      validate: {
        notNull: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: { isEmail: true },
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: roles,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
        isPassword(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);
sequelizeTransforms(User);

module.exports = User;
