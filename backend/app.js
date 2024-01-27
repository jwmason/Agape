const express = require('express');
const cors = require('cors');
require('dotenv').config();

const profileRouter = require('./routes/profileRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  }),
);

app.use('/value', profileRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
