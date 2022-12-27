const db = require("../models");
const Vegitables = db.Vegitables;
const Op = db.Sequelize.Op;

// Create and Save a new vegitables
exports.create = (req, res) => {
  // Validate request
  if (!req.body.vegitable) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a vegitables
  const vegitables = {
    vegitable: req.body.vegitable,
    picture: req.body.picture,
    type: req.body.type,
    
  };


  // Save vegitables in the database
  Vegitables.create(vegitables)
  .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the vegitables."
      });
    });
};


// Retrieve all Vegitabless from the database.
exports.findAll = (req, res) => {
  const vegitable = req.query.vegitable;
  var condition = vegitable ? { vegitable: { [Op.like]: `%${title}%` } } : null;

  Vegitables.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vegitable."
      });
    });
};

// Find a single Vegitables with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vegitables.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Vegitables with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Vegitables with id=" + id
      });
    });
};

// Update a Vegitables by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Vegitables.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vegitables was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Vegitables with id=${id}. Maybe Vegitables was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vegitables with id=" + id
      });
    });
};

// Delete a Vegitables with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vegitables.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vegitables was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Vegitables with id=${id}. Maybe Vegitables was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vegitables with id=" + id
      });
    });
};

// Delete all Vegitables from the database.
exports.deleteAll = (req, res) => {
  Vegitables.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Vegitables were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Vegitables."
      });
    });
};

// find all published Vegitables
exports.findAllPublished = (req, res) => {
  Vegitables.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Vegitabless."
      });
    });
};
