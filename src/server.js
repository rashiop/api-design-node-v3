import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

export const app = express();
const router = express.Router();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

router.get('/me', (req, res, next) => {
  res.send({ me: 'hello' });
});

app.use('/api', router);

app.get('/data', (req, res) => {
  res.send({ message: 'hello2' });
});

app.post('/data', (req, res) => {
  res.send(req.body);
});

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000');
  });
};
