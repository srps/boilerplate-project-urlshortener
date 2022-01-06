import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { URL } from 'url';
import cryptoRandomString from 'crypto-random-string';
const app = express();
dotenv.config();

const databaseURI = process.env['MONGO_URI'];

const urlSchema = new mongoose.Schema({
    original_url: { type: String, required: true }, 
    short_url : { type: String, required: true },
  });

const urlShortener = mongoose.model('urlshortener', urlSchema);

console.log(mongoose.version)

mongoose.connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(response => { console.log("connected"); })
        .catch(err => { console.log(err) });

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.route('/api/shorturl/:shorturl([0-9a-zA-Z]+)')
  .get((req, res) => {
    console.log(req.params);
    urlShortener.findOne({short_url: req.params.shorturl}, (err, shortUrl) => {
      if (shortUrl) {
        res.redirect(301, shortUrl.original_url);
      } else if (err) {
        res.json({error: err.message});
      } else {
        res.json({error: `Cannot find URL for ${req.params.shorturl}`});
      }
    });
});

app.route('/api/shorturl')
  .post((req, res) => {
    try {
      const uri = new URL(req.body.url);
      const shorturi = cryptoRandomString({length: 10, type: 'alphanumeric'});
      const uriJson = {
        original_url: uri.toString(),
        short_url: shorturi,
      }
      urlShortener.create(uriJson);
      res.json(uriJson);
    } catch (error) {
      res.json({
        error: error.message
      })
    }
    
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
