import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';
import upload from './config/upload';

const app = express();

app.use('/files', express.static(upload.folderDestination));

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Server On'));
