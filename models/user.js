//สิ่งที่returnจาก functionนี้ คือ model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 12],
        },
      },
      birth_date: DataTypes.DATEONLY,
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  //db => {'User':userModel , 'Todo':todoModel}
  // User.associate =(db) =>{
  //     User.hasMany(db.Todo)
  // }

  //มักตั้งชื่อจากdb เป็น model
  User.associate = (models) => {
    User.hasMany(models.Todo, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  //   console.log(User.name) //User
  return User;
};
