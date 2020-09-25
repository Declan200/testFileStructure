const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty! error in user create"
        });
        return;
    }

    // Create a User
    const user = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    // Save User in the database
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
// Retrieve all User from the database.
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

// Find a single User with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err, {
                message: "Error retrieving User with id=" + id
            });
        });
};



// Update a User by the id in the request
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
                    Cannot update User with id = ${ id }.Maybe Tutorial was not found or req.body is empty! `
                });
            }
        })
        .catch(err => {
            res.status(500).send(err, {
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = ('/users/:id', async(req, res) => {
        const id = req.params.id
        try {

            const user = await User.destroy({ where: { id: id } })
            if (!user) {
                return res.status(404).send()
            }
            res.send('User successfully deleted')
        } catch (e) {
            res.status(500).send('Could not delete the user with id: ' + id)
        }
    })
    // exports.delete = (req, res) => {
    //     const id = req.params.id;

//     User.destroy({
//             where: { id: id }
//         })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "User was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete User with id = ${ id }.Maybe User was not found! `
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send(err, {
//                 message: "Could not delete User with id=" + id
//             });
//         });
// };

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