module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('users', 'password', 'cognito_user_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('users', 'cognito_user_id', 'password');
  }
};