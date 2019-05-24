module.exports = (sequelize,Sequelize) =>{
    const Subscriptions = sequelize.define('subscriptions', {
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        list_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        }
    });
    /*
    Subscriptions.sync()
    .then(() => console.log('Subscriptions table created successfully'))
    .catch(err => console.log('Error while syncing Subscriptions table: ' + err));
    */
    return Subscriptions; 
  };