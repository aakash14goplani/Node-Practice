/* below lines will be executed by sequlize behind the scenes
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_complete',
    password: 'admin'
}); */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'admin', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;
// module.exports = pool.promise();
