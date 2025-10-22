import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Collection extends Model { }

    Collection.init(
        {
            title: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: false },
            user_id: {
                type: DataTypes.INTEGER,
                references: { model: 'users', key: 'id' },
                allowNull: false,
            },
            type_id: {
                type: DataTypes.INTEGER,
                references: { model: 'types', key: 'id' },
                allowNull: false,
            },
        },
        { sequelize, modelName: 'Collection' }
    );

    Collection.associate = (models) => {
        Collection.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
        Collection.belongsTo(models.Types, { foreignKey: 'type_id', as: 'type' });
    };

    return Collection;
};