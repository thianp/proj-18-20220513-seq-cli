module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dueDate: DataTypes.DATEONLY,
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  //   console.log(User.name) //User
  return Todo;
};
