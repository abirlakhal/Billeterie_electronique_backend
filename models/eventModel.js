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
        cat: {
            type: String, //ref to catalogue
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const EventModel = mongoose.model('event', eventSchema);
module.exports = EventModel;