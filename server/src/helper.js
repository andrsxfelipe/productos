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

    fs.createReadStream('categorias.csv')
        .pipe(csv())
        .on('data', (row) => {
            const sql =  `
            INSERT INTO Categorias (NombreCategoria)
            SELECT ? FROM DUAL
            WHERE NOT EXISTS (
                SELECT 1 FROM Categorias WHERE NombreCategoria = ?
            );
            `
            db.query(sql, [manejoVar(row.NombreCategoria), manejoVar(row.NombreCategoria)], (error, results) => {
                if (error) throw error;
                console.log(`Fila insertada: ${results.affectedRows}`);
            });
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
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u')
        .toLowerCase()
        .trim();
}


uploadCSV()