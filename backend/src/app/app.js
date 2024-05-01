import express from 'express';
import userRouter from '../router/user.router.js';
import teamRouter from '../router/team.router.js';
import adminRouter from '../router/admin.router.js';
import createAssociations from '../../asociations.js';
import entrenadorRouter from '../router/entrenador.router.js';

createAssociations();

import cors from 'cors';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
app.use(cors());

//para poder leer body en las peticiones
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/entrenador', entrenadorRouter);

export default app;