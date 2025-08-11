import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2';


export const uploadCSV = () => {

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'Andrsxfelipe',
        password: 'idQ6kwx+',
        database: 'productos'
    });

    db.connect((error) => {
        if (error) throw error;
        console.log('Conectado exitosamente a la db');
    })

    fs.createReadStream('clientes.csv')
        .pipe(csv())
        .on('data', (row) => {
            const sql = `
            INSERT INTO Clientes (Nombre, Correo, Telefono)
            SELECT ?, ?, ? FROM DUAL
            WHERE NOT EXISTS (
                SELECT 1 FROM Clientes WHERE Correo = ?
            )
            `;
            db.query(
                sql,
                [
                    manejoVar(row.nombre),
                    manejoVar(row.correo),
                    manejoVar(row.telefono),
                    manejoVar(row.correo) // Para el WHERE NOT EXISTS
                ],
                (error, results) => {
                    if (error) throw error;
                    console.log('Insert Cliente OK:', results);
                }
            );

            console.log(row);
            console.log('--');
        })
        .on('end', () => {
            console.log('CSV único procesado.');
            db.end();
        });

}


function manejoVar(x) {
    return x
        .toLowerCase()
        .trim();
}


uploadCSV()