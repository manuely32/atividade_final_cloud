module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('collection', {
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
      allowNull: false
    },

    type_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'type',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false
    },

    image: {
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

  down: (queryInterface) => queryInterface.dropTable('collection')
}
