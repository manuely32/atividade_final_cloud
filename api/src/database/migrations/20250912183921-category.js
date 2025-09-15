module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('category', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    description: {
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

  down: (queryInterface) => queryInterface.dropTable('category')
}
