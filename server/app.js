import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import course from './routes/course.js';
import user from './routes/user.js';
import auth from './routes/auth.js';

// init dotenv
dotenv.config();

// init express app
const app = express();
app.use(morgan('dev')); // setup logging
app.use(bodyParser.json()); // fix req.body undefined
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes
app.use('/api/course', course);
app.use('/api/user', user);
app.use('/api/auth', auth);

// launch server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));