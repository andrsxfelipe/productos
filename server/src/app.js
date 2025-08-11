import express from 'express';
import cors from 'cors'; 
import clientesRoutes from './routes/clientes.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

// app.get('/import', (req,res) => {
//     insertRows();
//     res.json({message: 'Import ejecutado'});
// });

app.use('/clientes', clientesRoutes);



export default app;
 