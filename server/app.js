import express from 'express';
import { router } from './route/index.js';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import { database } from './database/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 80;
const DB = mongodb.MongoClient;

app.use('/files', express.static(__dirname +'/files'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
}));

database(DB)
.then( result => {
  router(app, result)
})

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})
