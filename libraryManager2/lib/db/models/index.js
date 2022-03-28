'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'local';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

const initialize = async () => {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
    console.log(config.use_env_variable);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    console.log(modelName);
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

module.exports = {
  initialize,
  db,
};
