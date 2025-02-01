import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Users extends Model { }

    Users.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING
            },
            phone_number: {
                type: DataTypes.STRING
            },
        },
        {
            sequelize,
            modelName: 'users'
        }
    );

    Users.associate = (models) => {
        Users.hasOne(models.Profiles, { foreignKey: 'user_id', as: 'profile' });
    };

    return Users;
};