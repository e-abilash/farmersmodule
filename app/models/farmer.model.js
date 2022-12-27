module.exports = (sequelize, Sequelize) => {
    const Farmer = sequelize.define("farmer", {
      
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      village: {
        type: Sequelize.STRING
      },
      gpayno: {
        type: Sequelize.STRING
      },
      scanner: {
        type: Sequelize.STRING
      },
    });
    return Farmer;
  };
