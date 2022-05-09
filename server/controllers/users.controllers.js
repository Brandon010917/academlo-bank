const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { Transfer } = require("../models/transfer.model");

dotenv.config({ path: "./config.env" });

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: "active",
    },
    attributes: {
      exclude: ["password"],
    },
  });

  res.status(200).json({
    status: "success",
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const randomNumber = Math.floor(Math.random() * (1000000 - 99999)) + 99999;

  const genSalt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, genSalt);

  const newUser = await User.create({
    name,
    password: hashedPassword,
    accountNumber: randomNumber,
  });

  newUser.password = undefined;

  res.status(201).json({
    newUser,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      status: "active",
    },
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    return next(new AppError(404, "Can't find user by the given id"));
  }

  if (user.password !== password) {
    return next(new AppError(403, "Credentials invalid"));
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

const getAllTransfersById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const transfers = await Transfer.findAll({
    where: {
      senderUserId: userId,
    },
  });

  res.status(200).json({
    transfers,
  });
});

module.exports = {
  createUser,
  loginUser,
  getAllTransfersById,
};
