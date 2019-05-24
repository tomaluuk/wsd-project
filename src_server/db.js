const Sequelize = require("sequelize");

//initialize an instance of Sequelize
const sequelize = new Sequelize({
    database: 'jussi',
    username: 'root',
    password: 'pirjo',
    dialect: 'mysql'
});

//check the database connection
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established.'))
    .catch(err => console.error('Unable to connect to the database: ', err));
   
var UserModel = require('./models/users');
var ListModel = require('./models/lists');
var SubscriptionModel = require('./models/subscriptions');
var ItemModel = require('./models/items');

const Users = UserModel(sequelize, Sequelize);
const Items = ItemModel(sequelize, Sequelize);
const Subscriptions = SubscriptionModel(sequelize, Sequelize);
const Lists = ListModel(sequelize, Sequelize);

// Create database and tables if doesn't exist
sequelize.sync()//{force:true}
.then(()=>{
  console.log('Database and tables created!!');
})

module.exports = {
    Users,
    Lists,
    Items,
    Subscriptions
}