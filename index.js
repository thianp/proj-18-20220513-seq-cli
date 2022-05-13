// const db = require('./models') //การimportตัวนี้มันจะ connnect ข้อมูลใน database อัตโนมัติ

//destructuringจากข้างบน
const { sequelize, User, Todo } = require("./models");

// sequelize.sync({ force: true });

// db.sequelize.authenticate().then(() => console.log('DB connected'))

// const run = async() =>{
//     // try{

//     //     const user =await User.create({username: 'john',password:'123456',email:'john@a.com'})
//     // }catch(err){
//     //     console.log(err)
//     // }
// }
// run();
