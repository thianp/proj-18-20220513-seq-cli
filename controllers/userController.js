const createError = require("../utils/createError");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // const body = req.body
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      createError("password did not match", 400);
      // return res.status(400).json({ message: 'password did\'nt match' })
    }

    if (!password) {
      createError("password is required", 400);
    }

    if (password.length < 6) {
      createError("password must be at least 6 cahracters", 400);
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    // await User.create({ username, email, password });
    await User.create({ username, email, password: hashed });
    res.status(201).json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!password) {
      createError("password is required", 400);
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      createError("invalid username or password", 400);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      createError("invalid username or password", 400);
    } else {
      // Create JWT
      const payload = {
        id: user.id,
        username,
        email: user.email,
      };
      const secretKey = "1q2w3e";
      const token = jwt.sign(payload, secretKey, {
        algorithm: "HS512",
        expiresIn: '30d',
      });

      res.status(201).json({ message: "login success", token });
    }
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