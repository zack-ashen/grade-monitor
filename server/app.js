import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import course from './routes/course.js';
import user from './routes/user.js';
import auth from './routes/auth.js';

// init dotenv
dotenv.config();

// init express app
const app = express();
app.use(morgan('dev')); // setup logging

// routes
app.use('/api/course', course);
app.use('/api/user', user);
app.use('/api/auth', auth);


app.listen(5000, () => console.log(`Listening at https://localhost:5000`));