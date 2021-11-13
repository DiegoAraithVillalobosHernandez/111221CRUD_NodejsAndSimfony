const mysql = require('mysql');
const {promisify} = require('util'); //para hacer promesas, callbacks, async await
const {database} = require('./keys.js');//buena práctica solo importar un obj

const pool = mysql.createPool(database);

pool.getConnection((err,conn) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log("DATABASE WAS CLOSED");
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log("DATABASE HAS TO MANY CONNECTIONS");
        }
        if(err.code === 'ECONNREFUSED'){
            console.log("DABABASE CONNECTION REFUSED");
        }
    }
    if(conn) conn.release();
    console.log("DABABASE IS CONNECTED");
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;