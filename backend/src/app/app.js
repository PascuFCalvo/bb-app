import express from 'express';
import router from '../router/userRouter/user.router.js';
import cors from 'cors';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
app.use(cors());

//para poder leer body en las peticiones
app.use(express.json());

app.use('/api/v1', router);

export default app;