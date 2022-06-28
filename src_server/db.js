import Sequelize from "sequelize";

//initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: "jussi",
  username: "root",
  password: "pirjo",
  dialect: "mysql",
});

//check the database connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established."))
  .catch((err) => console.error("Unable to connect to the database: ", err));

import UserModel from "./models/users.js";
import ListModel from "./models/lists.js";
import SubscriptionModel from "./models/subscriptions.js";
import ItemModel from "./models/items.js";

const Users = UserModel(sequelize, Sequelize);
const Items = ItemModel(sequelize, Sequelize);
const Subscriptions = SubscriptionModel(sequelize, Sequelize);
const Lists = ListModel(sequelize, Sequelize);

// Create database and tables if doesn't exist
sequelize
  .sync() //{force:true}
  .then(() => {
    console.log("Database and tables created!!");
  });

export default {
  Users,
  Lists,
  Items,
  Subscriptions,
};
