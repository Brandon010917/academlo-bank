const express = require("express");

// Controllers
const {
  createUser,
  loginUser,
  getAllTransfersById,
} = require("../controllers/users.controllers");

const router = express.Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/:userId/history", getAllTransfersById);

module.exports = { usersRouter: router };
