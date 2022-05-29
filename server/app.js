import express from 'express';
import morgan from 'morgan';

import course from './routes/course';

const app = express();
app.use(cors());
app.use(morgan('dev'));


app.use('/api/course', course);



app.listen(5000, () => console.log(`Listening at https://localhost:5000`));