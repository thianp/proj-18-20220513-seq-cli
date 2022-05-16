const createError = require("../utils/createError");
const { User } = require("../models");

exports.register = async (req, res, next) => {
  try {
    // const body = req.body
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      createError("password did not match", 400);
      // return res.status(400).json({ message: 'password did\'nt match' })
    }

    // Create new user
    await User.create({ username, email, password });
    res.status(201).json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, oldPassword, newPassword, confirmNewPassword } =
      req.body;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      createError("user not found", 400);
    }

    if (oldPassword !== user.password) {
      createError("incorrect password", 400);
    }

    if (newPassword !== confirmNewPassword) {
      createError("password did not match", 400);
    }

    const result = await User.update(
      { email, password: newPassword },
      {
        where: { id },
      }
    );
    res.json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};
