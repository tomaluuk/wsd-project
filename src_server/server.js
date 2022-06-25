//requiring neessary npm middleware packages
var express = require("express");
var session = require("express-session");
const Sequelize = require("sequelize");
var passport = require("passport");

//Setting up port
var PORT = process.env.PORT || 8800;
//Creating express app and configuring middleware
// needed to read through our public folder
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("build"));

/*
Items.sync()
    .then(() => console.log('Items table created successfully'))
    .catch(err => console.log('Error while syncing Items table: ' + err));
*/

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

// API routes
var routes = require("./router/api")(app);
app.use("/", routes);

// This will listen to and show all activities on our terminal to
//let us know what is happening in our app
app.listen(PORT, function () {
  console.log("app listening on PORT " + PORT);
});
