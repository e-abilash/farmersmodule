module.exports = (sequelize, Sequelize) => {
    const FarmerVeg = sequelize.define("farmerVeg", {
      
      farmerId: {
        type: Sequelize.STRING
      },
      vegitableId: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      quantityType: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
    });
  
    return FarmerVeg;
  };