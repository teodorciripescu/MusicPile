'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const compression = require('compression');
const HttpStatus = require('http-status-codes');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');

const {

} = require('./middlewares');
const models = require('./models');
const router = require('./routes');

process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
dotenv.config({
    path: `${__dirname}/configs/${process.env.NODE_ENV}.env`,
});
const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
// app.use(compression());
// app.use(requireAuth())
app.use('/api', router);

// 404
app.use((req, res, next) => {
    return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Route ${req.url} Not found.` });
});

// 500 - Any server error
app.use((error, req, res, next) => {
    // req.log.error(error);
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error });
});


mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database.');
        app.listen(PORT, () => console.log(`${process.env.APP_NAME} is listening on ${PORT}`));
    });

