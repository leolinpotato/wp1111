import express from 'express';
import cors from 'cors';
import routes from './routes/index'
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import db from './db'

dotenv.config();
db.connect();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);
const port = process.env.PORT || 4000;

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);