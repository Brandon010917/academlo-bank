const express = require("express");
const cors = require("cors");

// Controllers
const { globalErrorHandler } = require("./controllers/errors.controllers");

// Routers
const { usersRouter } = require("./routes/users.routes");
const { transfersRouter } = require("./routes/transfers.routes");

const app = express();

// Enable cors
app.use(cors());

// Enable incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/transfers", transfersRouter);

// Error handler
app.use(globalErrorHandler);

module.exports = { app };
