module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('profiles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true
    },

    birth_date: {
      type: Sequelize.DATE
    },

    profile_photo: {
      type: Sequelize.STRING
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

  down: (queryInterface) => queryInterface.dropTable('profiles')
}
