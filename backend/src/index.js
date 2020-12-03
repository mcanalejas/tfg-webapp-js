const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const apiRouter = require('./router/api');
const morgan = require('morgan');

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enrutamiento
app.use('/api', apiRouter);

// Servidor de express
app.listen(3001, () => {
    console.log('Server is running on port:', 3001);
})


