// src/config/db.js  ESTA ES LA CONEXION A LA BASE DE DATOS
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Andrsxfelipe',
    password: 'idQ6kwx+',
    database: 'productos',
    multipleStatements: true
});

connection.connect(err => {
    if (err) {
        console.error('Hubo un error al conectarse con MySQL:', err.message);
    } else {
        console.log('Conexión exitosa a MySQL');
    }
});

export default connection;