module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        // username: {
        //     type: Sequelize.STRING(35)
        // },
        firstName: {
            type: Sequelize.STRING(35),
            allowNull: false,
            primaryKey: true
        },
        lastName: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
        // updatedAt: {
        //     type: Sequelize.DATE(30)
        // },
        // createdAt: {
        //     type: Sequelize.DATE(30)
        // }
    })
    return User
}