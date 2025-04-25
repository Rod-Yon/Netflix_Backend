const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookie_parser = require('cookie-parser');


const port = process.env.PORT || 8080;

const { authorization_router } = require('./routers/authorization_router');
const { profile_router } = require('./routers/profile_router');
const { media_router } = require('./routers/media_router');
const { review_router } = require('./routers/review_router');
const { home_router } = require('./routers/home_router');
const { api_router } = require('./routers/api_router');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookie_parser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use((req, res, next) => {

    if (req.path == '/') return next();

    const token = req.cookies?.token;
    if (!token) return res.redirect('/');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        return res.redirect('/');
    }
});

app.use('/', authorization_router);
app.use('/profiles', profile_router);
app.use('/home', home_router);
app.use('/media', media_router);
app.use('/review', review_router);
app.use('/api', api_router);


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});