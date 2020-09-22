module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('customer', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        // username: {
        //     type: Sequelize.STRING(35)
        // },
        email: {
            type: Sequelize.STRING(35),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
    })
    return Customer
}