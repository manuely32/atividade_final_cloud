import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Types extends Model { }

    Types.init(
        {
            description: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'types'
        }
    );

    return Types;
};