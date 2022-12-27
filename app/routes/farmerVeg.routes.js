module.exports = app => {
    const farmerVeg = require("../controllers/farmerVeg.controller.js");
  
    var router = require("express").Router();

     // Create a new farmer
  router.post("/create", farmerVeg.create);

  // Retrieve all farmerVeg
  router.get("/findAll", farmerVeg.findAll);

   // Retrieve all farmerVeg
  router.get("/", farmerVeg.findAllFarmers);

  // Retrieve all published farmerVeg
  router.get("/published", farmerVeg.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", farmerVeg.findOne);

  // Update a Tutorial with id
  router.put("/:id", farmerVeg.update);

  // Delete a Tutorial with id
  router.delete("/:id", farmerVeg.delete);

  // Delete all farmerVeg
  router.delete("/", farmerVeg.deleteAll);

  app.use('/api/farmerVeg', router);
};
