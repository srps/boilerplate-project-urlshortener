import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './src/data-access/connection.js';
import { getUrlController, postUrlController } from './src/controllers/index.js';
import makeExpressCallback from './src/express-callback/express-callback.js';

const app = express();
dotenv.config();

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.route('/api/shorturl/:id?')
  .get(makeExpressCallback(getUrlController))
  .post(makeExpressCallback(postUrlController));

connectDB(app);
