const { DataSource } =require("typeorm")
const dbConfig= require('../config/dbConfig')

const AppDataSource = new DataSource(dbConfig);

module.exports= AppDataSource