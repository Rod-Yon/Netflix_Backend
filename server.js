const express = require('express');
const logger = require('morgan');

const port = process.env.PORT || 8080;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});