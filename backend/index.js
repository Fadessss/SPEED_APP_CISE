require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

import User from '../models/user'


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

app.post('/data', (req, res) => {
  const userData = new User(req.body);
  userData.save()
    .then(() => {
      res.status(200).json({ 'message': 'data added successfully' });
    })
    .catch(() => {
      res.status(400).send('unable to save to database');
    });
})

app.listen(3001, () => console.log('Server running on port 3001'));