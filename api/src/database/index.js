import { Sequelize, DataTypes } from 'sequelize'

import Users from '../Models/Users.js';
import Profiles from '../Models/Profiles.js';
import Collections from '../Models/Collections.js';
import Types from '../Models/Types.js';
import registerAssociations from './associations.js';

import databaseConfig from '../config/database.js'
import Category from '../Models/Category.js';

const connection = new Sequelize(databaseConfig)

const usersModel = Users(connection, DataTypes);
const profilesModel = Profiles(connection, DataTypes);
const collectionsModel = Collections(connection, DataTypes);
const typesModel = Types(connection, DataTypes);
const categoryModel = Category(connection, DataTypes);

const models = {
    Users: usersModel,
    Profiles: profilesModel,
    Collections: collectionsModel,
    Types: typesModel,
    Category: categoryModel
}

registerAssociations(models);

export { connection, models }
