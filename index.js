const express = require('express');
const app = express();

const routes = require('./routes');
const errHandler = require('./middlewares/errorHandler');

const portConfig = require('./config/portConfig');
const expressSetup = require('./config/expressConfig');

expressSetup(app);
require('./config/mongooseSetup');


app.use(routes);

app.use(errHandler);

app.listen(portConfig.PORT, () => console.log(`Server listening on port: ${portConfig.PORT}...`));
