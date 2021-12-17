const User = require("../models/user");
const jwtDecode = require("jwt-decode");
const { body, validationResult } = require("express-validator");

const {
  createToken,
  hashPassword,
  verifyPassword,
} = require("../utils/authentication");

exports.signup = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  const { username, email, gender } = req.body;

  const hashedPassword = await hashPassword(req.body.password);

  const userData = {
    username: username.toLowerCase(),
    password: hashedPassword,
    email: email,
    gender: gender,
  };

  const existingUsername1 = await User.findOne({
    email: userData.email,
  });

  if (existingUsername1) {
    return res.status(400).json({
      message: "E-mail already exists.",
    });
  }

  const newUser = new User(userData);
  const savedUser = await newUser.save();

  if (savedUser) {
    const token = createToken(savedUser);
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;

    const { username, email, gender, id, created, profilePhoto } = savedUser;
    const userInfo = {
      username,
      email,
      id,
      gender,
      created,
      profilePhoto,
    };

    return res.json({
      message: "User created!",
      token,
      userInfo,
      expiresAt,
    });
  }
};

exports.authenticate = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(403).json({
        message: "Wrong username or password.",
      });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (passwordValid) {
      const token = createToken(user);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const { username, email, gender, id, created, profilePhoto } = user;
      const userInfo = { username, email, gender, id, created, profilePhoto };

      res.json({
        message: "Authentication successful!",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      res.status(403).json({
        message: "Wrong username or password.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

exports.adminlogin = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (email == "admin@gmail.com" && password == "admin") {
      res.json({
        message: "Authentication successful!",
      });
    } else {
      return res.status(403).json({
        message: "Wrong credentials.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const { sortType = "-created" } = req.body;
    const users = await User.find().sort(sortType);
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

exports.find = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.validateUser = [
  body("email")
    .exists()
    .trim()
    .withMessage("is required")

    .notEmpty()
    .withMessage("cannot be blank"),
];
