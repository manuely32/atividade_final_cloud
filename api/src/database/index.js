import { Sequelize, DataTypes } from 'sequelize'
import Users from '../models/Users.js';
import Profiles from '../models/Profiles.js';
import Collection from '../models/Collection.js';
import Types from '../models/Types.js';
import registerAssociations from './associations.js';

import databaseConfig from '../config/database.js'

const connection = new Sequelize(databaseConfig)

const usersModel = Users(connection, DataTypes);
const profilesModel = Profiles(connection, DataTypes);
const collectionModel = Collection(connection, DataTypes);
const typesModel = Types(connection, DataTypes);

const models = {
    Users: usersModel,
    Profiles: profilesModel,
    Collection: collectionModel,
    Types: typesModel
};

registerAssociations(models);

export { connection, models }
