import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Collections extends Model { }

    Collections.init(
        {
            title: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: false },
            author: { type: DataTypes.STRING },
            release_year: { type: DataTypes.INTEGER },
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
            category_id: {
                type: DataTypes.INTEGER,
                references: { model: 'category', key: 'id' },
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING
            }
        },
        { sequelize, modelName: 'Collections' }
    );

    Collections.associate = (models) => {
        Collections.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
        Collections.belongsTo(models.Types, { foreignKey: 'type_id', as: 'type' });
        Collections.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    };

    return Collections;
};