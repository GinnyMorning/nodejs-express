'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        trim: true,
        primaryKey: true,
        validate: {
          notNull: true,
        },
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: { isEmail: true },
      },
      role: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          isIn: ['user', 'admin'],
        },
      },
      password: {
        type: Sequelize.DataTypes.STRING,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  },
};
