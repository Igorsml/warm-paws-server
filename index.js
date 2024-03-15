const express = require("express");
require("dotenv").config();
const petsListData = require("./petsList");
const sequelize = require("./db/db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("./api", router);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "WORKING" });
  res.send("Server is up and running!");
});

app.get("/pets-list", (req, res) => {
  console.log(petsListData);
  res.status(200).send(petsListData);
});

// Все операции с БД асинхронные
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
