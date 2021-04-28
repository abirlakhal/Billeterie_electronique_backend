const mongoose = require('mongoose');

mongoose.connect(
        'mongodb+srv://abir:0000@cluster0.y1gxo.mongodb.net/dbprojet',
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
    .then(() => console.log('Connectes to MongoDB'))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
    mongoose.Promise = global.Promise;
