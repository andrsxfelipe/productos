import { Router } from 'express';
import connection from '../config/db.js' 

const router = Router();

router.get('/', (req,res)=>{
    const sql = `
    SELECT * FROM Clientes;
    `
    connection.query(sql, (err,results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
})


router.post('/', (req,res)=>{
    
})


router.put('/', (req,res)=>{
    
})


router.delete('/', (req,res)=>{
    
})

export default router;