const { DataSource } = require('typeorm');
const Airport = require('./entity/Airport');
const City = require('./entity/City');
const Country = require('./entity/Country');

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'airportdb',
  synchronize: true,
  entities: [Airport, City, Country]
});

module.exports = AppDataSource;
