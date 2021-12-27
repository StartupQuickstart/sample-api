import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from '../package.json';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: 'mb' }));
app.use(bodyParser.text());
app.use(morgan('tiny'));

const bodyParserOptions = { extended: true };

app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded(bodyParserOptions));

app.use(cookieParser());

app.use(passport.initialize());

app.get('/', (req, res) => {
  res.status(200).json({
    apiName: pkg.name,
    version: pkg.version,
    currentTime: new Date(),
    timezone: process.env.TZ,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
