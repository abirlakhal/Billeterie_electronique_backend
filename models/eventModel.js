const mongoose  = require('mongoose');

const eventSchema  = new mongoose.Schema(
    {
       
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true,
            trim: true
        },
        place: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        price: {
            type: String,
            required: true
        },
        cat: {
            type: mongoose.Schema.Types.ObjectId,//ref to catalogue
            ref: 'categorie',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const EventModel = mongoose.model('event', eventSchema);
module.exports = EventModel;