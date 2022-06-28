export default (sequelize, Sequelize) => {
  const Items = sequelize.define("items", {
    item_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    dibs_user_id: {
      type: Sequelize.STRING,
    },
  });

  /*
    Items.sync()
    .then(() => console.log('Items table created successfully'))
    .catch(err => console.log('Error while syncing Item table: ' + err));
    */
  return Items;
};
