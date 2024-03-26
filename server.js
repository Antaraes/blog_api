const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routers/index");
const { handler } = require("./middleware/errorHandler");
const morgan = require("./config/morgan");
const path = require("path");
const { provider } = require("joi/lib/cache");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(process.env.CLIENT_PORT);
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

require("./config/db")();
app.use(morgan);
require("./config/logger");
app.use("/api/v1", router);
app.use(handler);
app.use(express.static(path.join(__dirname, "public")));
app.listen(process.env.PORT, function () {
  console.log("Server listening on", process.env.PORT);
});
