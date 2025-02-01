import { Sequelize, DataTypes } from 'sequelize'
import Users from '../models/Users.js';
import Profiles from '../models/Profiles.js';
import registerAssociations from './associations.js';

import databaseConfig from '../config/database.js'

const connection = new Sequelize(databaseConfig)

const usersModel = Users(connection, DataTypes);
const profilesModel = Profiles(connection, DataTypes);

const models = {
    Users: usersModel,
    Profiles: profilesModel,
};

registerAssociations(models);

export { connection, models }
