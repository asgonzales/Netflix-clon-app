import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app:Application = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


app.use('/api', routes)


export default app;