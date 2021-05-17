const express = require('express');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const catRoutes = require('./routes/catRoutes');
const billetRoutes = require('./routes/billetRoutes');
const scatRoutes = require('./routes/scatRoutes');
const classRoutes = require('./routes/classRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const paimentRoutes = require('./routes/paimentRoutes');

var cors = require('cors')
require('dotenv').config({path: './config/.env'});
require('./config/db');

require('./config/passportConfig');

const passport = require('passport');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads',express.static('uploads'));

app.use(passport.initialize());



// routes
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/cat', catRoutes);
app.use('/api/billet', billetRoutes);
app.use('/api/scat', scatRoutes);
app.use('/api/classe', classRoutes);
app.use('/api/evaluation', evaluationRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/paiment', paimentRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})






