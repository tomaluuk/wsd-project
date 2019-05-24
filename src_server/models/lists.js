module.exports = (sequelize,Sequelize) =>{
    const Lists = sequelize.define('lists', {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
    
    });
    /*
    Lists.sync()
    .then(() => console.log('Lists table created successfully'))
    .catch(err => console.log('Error while syncing Lists table: ' + err));
    */
    return Lists; 
  };