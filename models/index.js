'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//ส่วนconnect database
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//เวลาสร้างfileใหม่ ต้องเขียนtemplateให้เรียบร้อย และ export ออกไป ไม่งั้นแตก
fs
  .readdirSync(__dirname) //readได้เป็น array ของfileทั้งหมด
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }) //filterเอาเฉพาะfile ใน folder:models
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; //db['User'] = model //เพิ่มkey และ value Userเข้าไปในdb
  });

//ส่วนนี้คือไว้ทำrelation ระหว่างmodels
//db ตอนนี้หน้าตาแบบนี้ {'User':userModel , 'Todo':todoModel}
//Object.keys(db) ได้ ['User','Todo'] แล้วไป forEachต่อ เป็น 'User' , 'Todo" ถ้ามีrelationกัน มันจะassociateกัน
//forEach
//Iter#1 modelName =>'User;
//if db['User'].associate ? ถ้ามีส่งนี้ไป call db['User'].associate({'User':userModel , 'Todo':todoModel}) ทำให้มันrun ความสัมพันธ์ของ modelsออกมา
//เพิ่มเติม associate เป็น function ที่รับparameter เป็น db
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) { // db['User'].asscoiate
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
