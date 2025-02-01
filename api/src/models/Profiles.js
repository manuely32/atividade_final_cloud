import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Profiles extends Model { }

    Profiles.init(
        {
            birth_date: { type: DataTypes.DATE, allowNull: false },
            profile_photo: { type: DataTypes.BLOB },
            user_id: {
                type: DataTypes.INTEGER,
                references: { model: 'users', key: 'id' },
                allowNull: false,
            },
        },
        { sequelize, modelName: 'Profiles' }
    );

    Profiles.associate = (models) => {
        Profiles.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    };

    return Profiles;
};