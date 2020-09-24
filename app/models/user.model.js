const uuid = require('uuid')
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {

        user_id: {
            primaryKey: true,
            type: Sequelize.UUIDV1(36),
        },
        username: {
            type: Sequelize.STRING(35),
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING(35),
            allowNull: false,

        },
        last_name: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(35),
            allowNull: false,
        }
        // password: {
        //     Type: Sequelize.STRING(35),
        //     allowNull: false,
        // }
        // updatedAt: {
        //     type: Sequelize.DATE(30)
        // },
        // createdAt: {
        //     type: Sequelize.DATE(30)
        // }
    })
    return User
}