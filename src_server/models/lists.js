module.exports = (sequelize,Sequelize) =>{
    const Lists = sequelize.define('lists', {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        createdAt: {
            type: Sequelize.BOOLEAN,
        },
        updatedAt: {
            type: Sequelize.BOOLEAN
        }
    
    });
    /*
    Lists.sync()
    .then(() => console.log('Lists table created successfully'))
    .catch(err => console.log('Error while syncing Lists table: ' + err));
    */
    return Lists; 
  };