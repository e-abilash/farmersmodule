module.exports = (sequelize, Sequelize) => {
    const Vegitables = sequelize.define("vegitables", {
      
      vegitable: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      
    });
  
    return Vegitables;
  };