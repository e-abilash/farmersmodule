const db = require("../models");
const FarmerVeg = db.farmerVeg;
const Op = db.Sequelize.Op;

// Create and Save a new farmerVeg
exports.create = (req, res) => {
  // Validate request
  if (!req.body.farmerId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a farmerveg
  const farmerVeg = {
    farmerId: req.body.farmerId,
    vegitableId: req.body.vegitableId,
    quantity: req.body.quantity ,
    quantityType:req.body.quantityType,
    price:req.body.price,
    
  };  

  // Save farmer in the database
  FarmerVeg.create(farmerVeg)
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the FarmerVeg."
      });
    });
};

// Retrieve all FarmerVegs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  FarmerVeg.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving FarmerVegs."
      });
    });
};

// Find a single FarmerVeg with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  FarmerVeg.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find FarmerVeg with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving FarmerVeg with id=" + id
      });
    });
};

// Update a FarmerVeg by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  FarmerVeg.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "FarmerVeg was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update FarmerVeg with id=${id}. Maybe FarmerVeg was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating FarmerVeg with id=" + id
      });
    });
};

// Delete a FarmerVeg with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  FarmerVeg.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "FarmerVeg was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete FarmerVeg with id=${id}. Maybe FarmerVeg was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete FarmerVeg with id=" + id
      });
    });
};

// Delete all FarmerVegs from the database.
exports.deleteAll = (req, res) => {
  FarmerVeg.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} FarmerVegs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all FarmerVegs."
      });
    });
};

// find all published FarmerVeg
exports.findAllPublished = (req, res) => {
  FarmerVeg.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving FarmerVegs."
      });
    });
};

exports.findAllFarmers = (req,res) => {
  let sql = `SELECT farmers.name,vegitables.vegitable,farmervegs.farmerId,farmervegs.vegitableId,farmervegs.quantityType,farmervegs.price
  FROM farmers
  INNER JOIN vegitables ON farmers.id = vegitables.id
  INNER JOIN farmervegs ON farmers.id = farmervegs.id`;
  db.sequelize.query(sql).then(data => {
    res.send(data[0]);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving FarmerVegs."
    });
  });  
}