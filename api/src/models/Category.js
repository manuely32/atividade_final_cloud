import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Category extends Model { }

    Category.init(
        {
            description: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'category',
            freezeTableName: true
        }
    );

    return Category;
};