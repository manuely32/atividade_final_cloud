module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false
    },

    phone_number: {
      type: Sequelize.STRING,
      allowNull: false
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('users')
}
