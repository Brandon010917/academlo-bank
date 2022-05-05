const express = require("express");

// Controllers
const { sendTransfer } = require("../controllers/transfers.controllers");

const router = express.Router();

router.post("/", sendTransfer);

module.exports = { transfersRouter: router };
