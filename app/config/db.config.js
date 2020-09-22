module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'Christina20000',
    DB: 'todoapp',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};