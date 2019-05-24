module.exports = (sequelize,Sequelize) =>{
    const Users = sequelize.define('users', {
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        passwd: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    /*
    Users.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('Error while syncing User table: ' + err));
    */
    return Users; 
  };