module.exports = function (app){

var express = require('express');
var router =  express.Router();
var passport = require('passport');
var currentUser = "";
//const bcrypt = require('bcrypt');
const{ Users, Lists, Items, Subscriptions} = require('../db');

// import passport and passport-jwt modules
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'nZr4u7x!A%D*G-KaPdRgUkXp2s5v8y/B'; // 256 bit key
jwtOptions.algorithm = 'RS256';

// Lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {

    console.log('Payload received', jwt_payload);
    let user = getUser({ user_id: jwt_payload.id }); 
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
passport.use(strategy);

/* 
---------------------------------
    Database functions
---------------------------------
*/

/*
const createList = async ({ id, createdAt, updatedAt }) => {
    return await Lists.create({ id, createdAt, updatedAt });
};
*/

const createItem = async ({ item_id, dibs_user_id }) => {
    return await Items.create({ item_id, dibs_user_id });
};

const createUser = async ({ user_id, passwd }) => {
    return await Users.create({ user_id, passwd });
};

const getAllUsers = async () => {
    return await Users.findAll();
};

const getUser = async obj => {
    return await Users.findOne({
      where: obj,
    });
};

const callDibs = async ({ item_id, dibs_user_id }) => {
    return await Items.create({ item_id, dibs_user_id });
};

/*
const subToList = async ({ user_id, list_id }) => {
    return await Subscriptions.create({ user_id, list_id });
};

const getAllLists = async () => {
    return await Lists.findAll();
};
*/

const getAllItems = async () => {
    return await Items.findAll();
};
    
function setCurrentUser(usr) {
    currentUser = usr;
}

function getCurrentUser() {
    return currentUser;
}

router.get('/', function(req, res) {    
    res.sendFile('index.html');
  });

router.post('/addItem', function (req, res) {
    const { new_item, user } = req.body;
    console.log(new_item, user);
    var item_id = new_item;
    var dibs_user_id = user; //  Token Payload {id: käyttäjänimi!!!}
    //var list_id = 'juhannusmökä';
    createItem({ item_id, dibs_user_id }).then(item =>
        res.json({ item, msg: 'Item created successfully' })
    );
});

/*
router.post('/addlist', function (req, res) {
    const { id, createdAt, updatedAt } = req.body;
    console.log(id, createdAt, updatedAt);
    createList({ id, createdAt, updatedAt }).then(user =>
        res.json({ msg: 'List created successfully' })
    );
});
*/

router.post('/dibs', function(req, res) {
    const {item_id} = req.body
    //var id = 'juhannusmökä';
    //var dibs_user_id = 'testUser';

    createItem({ item_id, dibs_user_id }).then(dibs =>
        res.json({ dibs, msg: 'Item added succesfully'})    
    
    );
});

router.post('/register', function (req, res, next) {
    //first parameter names must be as in the fields where the information was taken from
    const { name, password } = req.body;
    console.log(name, password);
    var passwd = password;
    var user_id = name;
    //const saltRounds = 10;
    //bycrypt.hash(password,saltRounds,function(err,hashedPassword){
    
    createUser({ user_id, passwd }).then(user =>
        res.json({ user, msg: 'Account created successfully' })
    );
    //});      
});

router.post('/login', async function (req, res, next) {
    const { name, password } = req.body;
    console.log(name, password);
    var passwd = password;
    var user_id = name;
    if (user_id && passwd) {
        // we get the user with the name and save the resolved promise

        let user = await getUser({ user_id });
        if (!user) {
            res.status(401).json({ msg: 'No such user found', user });
        }
        //console.log(user);
        if (user.passwd === passwd) {
            // from now on we’ll identify the user by the id and the id is
            console.log('ready to sign token')
            // the only personalized value that goes into our token
            let payload = { id: user.user_id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            var returnJson = { msg: 'ok', token: token };
            console.log(returnJson);
            res.json(returnJson);
        } else {
            res.status(401).json({ msg: 'Password is incorrect' });
        }
    }
});

// logout route

router.post('/logout', function (req, res, next) {

});
    
/*
-----------------------------
     Protected route paths
-----------------------------
*/

/*
router.get('/lists', function (req, res) {
    getAllLists().then(lists => res.json(lists));
});
*/

router.get('/users', passport.authenticate('jwt',{session:false}), function(req, res) {
    getAllUsers().then(user => res.json(user));
});

// Get all items

router.get('/items', passport.authenticate('jwt',{session:false}), function(req, res) {       
    getAllItems().then(items => res.json(items));
}); 

// Add a item

router.post('/addItem', passport.authenticate('jwt',{session:false}), function(req, res) {     
    const { item_id, dibs_user_id } = req.body;
    console.log( item_id, dibs_user_id);
    createItem({ item_id, dibs_user_id}).then(user =>
        res.json({ item_id, msg: 'Item created successfully' })
    );
});

router.get('/currentUser', passport.authenticate('jwt', {session:false}), function(req, res) {
    //getCurrentUser().then(usr => res.json(usr));
    
    //let usr = strategy.ExtractJwt
    let token = req.headers.authorization.split(' ')[1];
    setCurrentUser(token);
    console.log('current user token:[',token,']');
    res.json({token});
    /*
    jwt.verify(token,jwtOptions.secretOrKey,function(err,decode){
        console.log(decode);
        res.json({decode});
    })
    */
});

router.post('/test', passport.authenticate('jwt',{session:false}), function(req, res) {     
  console.log('Arrived to TEST');
  let token = req.headers.authorization.split(' ')[1];
  console.log('token:[',token,']');
  
  jwt.verify(token,jwtOptions.secretOrKey,function(err,decode){
    console.log('UserID taked from payload of token:',decode.id);
  })
  
});

return router;
}