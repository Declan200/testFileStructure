const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({
            message: "Content can not be empty! error in user create"
        });
        return;
    }

    // Create a Tutorial
    const user = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };

    // Save Tutorial in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? {
        user_id: {
            [Op.like]: `%${user_id}%`
        }
    } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

    const user_id = req.params.user_id
    User.findOne({
            where: { id: user_id }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err, {
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `
                    Cannot update User with id = $ { id }.Maybe Tutorial was not found or req.body is empty! `
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `
                    Cannot delete User with id = $ { id }.Maybe User was not found! `
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `
                    $ { nums }
                    Users were deleted successfully! ` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all users."
            });
        });
};