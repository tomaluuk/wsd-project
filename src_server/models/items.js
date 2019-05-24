module.exports = (sequelize, Sequelize) => {
    const ItemsInLists = sequelize.define('items_in_lists', {
        item_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        dibs_user_id: {
            type: Sequelize.STRING,
        }
    });

    /*
    ItemsInLists.sync()
    .then(() => console.log('ItemsInLists table created successfully'))
    .catch(err => console.log('Error while syncing ItemsInLists table: ' + err));
    */
   return ItemsInLists;
}