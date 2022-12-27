module.exports = app => {
    const farmer = require("../controllers/farmer.controller.js");
  
    var router = require("express").Router();

     // Create a new farmer
  router.post("/create", farmer.create);

   // Retrieve all farmer
   router.get("/findAll", farmer.findAll);

   // Retrieve all published farmer
   router.get("/published", farmer.findAllPublished);
 
   // Retrieve a single Tutorial with id
   router.get("/findOne/:id", farmer.findOne);
 
   // Update a Tutorial with id
   router.put("/:id", farmer.update);
 
   // Delete a Tutorial with id
   router.delete("/:id", farmer.delete);
 
   // Delete all farmer
   router.delete("/", farmer.deleteAll);

  app.use('/api/farmer', router);

};
