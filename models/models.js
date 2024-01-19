const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, primaryKey: true, unique: true },
  password: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

// лакомства, мерч
const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Goods = sequelize.define("goods", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const GoodsInfo = sequelize.define("goodsInfo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Goods.hasMany(GoodsInfo);
GoodsInfo.belongsTo(Goods);

module.exports = {
  User,
  Basket,
  Goods,
  GoodsInfo,
};
