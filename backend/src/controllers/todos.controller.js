const db = require("../models");
const Todo = db.todo;
const { Op } = require("sequelize");


// Create and Save a new todo
exports.create = (req, res) => {
  console.log("Request body:", req.body); // Add this line for logging
  // Check if req.body exists and has a title
  if (!req.body || !req.body.title) {
    res.status(400).send({
      message: "Title is required."
    });
    return;
  }

  // Create a todo
  const todo = {
    title: req.body.title,
    description: req.body.description || "", // Add default value for description
    status: req.body.status || false, // Add default value for status
    username: req.body.status || "" // Add default value for status
  };

  // Save todo in the database
  Todo.create(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the todo."
      });
    });
};


// Retrieve all todos from the database.
exports.findAll = (req, res) => {
  // Use Todo model to find all todos
  Todo.findAll()
    .then(data => {
      if (data.length === 0) {
        // If no todos found, send custom message
        res.status(404).send({
          message: "No todos found."
        });
      } else {
        // If todos found, send the data
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos."
      });
    });
};


// Find a single todo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find todo with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving todo with id=" + id
      });
    });
};

// Update a todo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "todo was updated successfully."
          
        });
      } else {
        res.send({
          message: `Cannot update todo with id=${id}. Maybe todo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating todo with id=" + id
      });
    });
};

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "todo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete todo with id=${id}. Maybe todo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete todo with id=" + id
      });
    });
};

// Delete all todos from the database.
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} todos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all todos."
      });
    });
};

// find all status todo
exports.findAllStatus = (req, res) => {
  Todo.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    });
};