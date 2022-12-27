const db = require("../models");
const Farmer = db.farmer;
const Op = db.Sequelize.Op;

// Create and Save a new farmer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a farmer
  const farmer = {
    name: req.body.name,
    phone: req.body.phone,
    village: req.body.village,
    gpayno: req.body.gpayno,
    scanner: req.body.scanner,
  };


  // Save farmer in the database
  Farmer.create(farmer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Farmer."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${title}%` } } : null;

  Farmer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving farmer."
      });
    });
};

// Find a single farmer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Farmer.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find farmer with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving farmer with id=" + id
      });
    });
};

// Update a farmer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Farmer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Farmer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Farmer with id=${id}. Maybe Farmer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Farmer with id=" + id
      });
    });
};

// Delete a Farmer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Farmer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Farmer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Farmer with id=${id}. Maybe Farmer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Farmer with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Farmer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Farmer were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Farmer."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Farmer.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Farmer."
      });
    });
};

