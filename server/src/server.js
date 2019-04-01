import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import config from './config';
import cors from 'cors';
import { connect } from './utils/db';
import userRouter from './resources/user/user.router';
import { signup, signin, protect } from './utils/auth';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// protect the entire API using our JWT middleware
app.use('/api', protect);
app.use('/api/user', userRouter);

app.get('/api/test', (req, res) => {
  return res.status(200).send({ message: 'testing passed!' });
});

// to login and sign up
app.post('/signup', signup);
app.post('/signin', signin);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
