import 'reflect-metadata';
import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import { createConnection } from 'typeorm';
import routes from './router';
import cors from 'cors';

import { HandleErrors } from './support/http/HandleErrors';

createConnection()
  .then(() => {
    const app: Application = express();
    const port = 3000;

    app.use(cors());

    // parse application/x-www-form-urlencoded
    app.use(urlencoded({ extended: true }))

    // parse application/json
    app.use(json())

    // Application routing
    app.use('/api/', routes);

    app.use(HandleErrors);

    // Start server
    app.listen(port, () =>
      console.log('Example app listening at http://localhost:3000')
    );
  })
  .catch((error) => console.log(error));
