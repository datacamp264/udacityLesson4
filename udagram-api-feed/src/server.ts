import cors from 'cors';
import express, { Request, Response } from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_FEED_MODELS} from './controllers/v0/model.index';
import morgan from 'morgan';

(async () => {
  console.log(`Postgres URL: ${config.host}`)
  await sequelize.addModels(V0_FEED_MODELS);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());
  app.use(morgan('combined'))
  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: config.url,
  }));

  app.use('/', IndexRouter);

  //healtcheck for
  app.get('/healthy', async (req: Request, res: Response) => {
    res.status(200).send('healthy');
  });


  // Start the Server
  app.listen( port, () => {
    console.log( `server running ${config.url}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
