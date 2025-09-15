module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('collections', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'category', // tabela relacionada (se existir)
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('collections', 'author', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('collections', 'release_year', {
      type: Sequelize.INTEGER
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('collections', 'category_id');
    await queryInterface.removeColumn('collections', 'author');
    await queryInterface.removeColumn('collections', 'release_year');
  }
};