const dotenv = require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./router/userRouter");
const viewRouter = require("./router/viewRoutes");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
const PORT = process.env.PORT || 7000;
const DATABASE = process.env.DATABASE;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:7000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use("/", viewRouter);
app.use("/users/join-waitlist", userRouter);
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

mongoose
  .connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log("Database Connected Successfully!");
  });
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

