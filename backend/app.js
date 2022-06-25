const express = require("express");
const app = express();
const cors = require("cors");
const { errorHandler } = require("../backend/middileware/error");
const morgan = require("morgan");
require("express-async-errors");
require("dotenv").config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
require("./db");
const userRouter = require("./Router/user");
const { handleNotFound } = require("./utils/helper");
app.use("/api/user", userRouter);
app.use("*", handleNotFound);
app.use(errorHandler);
app.listen(4000, () => {
  console.log("serve listen...");
});
