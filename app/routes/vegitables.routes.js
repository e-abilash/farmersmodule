module.exports = app => {
    const vegitables = require("../controllers/vegitables.controller.js");
  
    var router = require("express").Router();

     // Create a new farmer
  router.post("/create", vegitables.create);

  // Retrieve all vegitables
  router.get("/", vegitables.findAll);

  // Retrieve all published vegitables
  router.get("/published", vegitables.findAllPublished);

  // Retrieve a single vegitables with id
  router.get("/:id", vegitables.findOne);

  // Update a vegitables with id
  router.put("/:id", vegitables.update);

  // Delete a vegitables with id
  router.delete("/:id", vegitables.delete);

  // Delete all vegitables
  router.delete("/", vegitables.deleteAll);

  app.use('/api/vegitables', router);

};