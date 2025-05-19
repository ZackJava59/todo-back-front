import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express, {Application, NextFunction, Request, Response} from 'express';
import todoRoutes from './routes/todo.routes.js';

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/todos', todoRoutes);


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Sorry, cant find that!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something broke!', error: err.message});
});

export default app;





