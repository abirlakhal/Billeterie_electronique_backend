const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

const messSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true
        },
        main: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 10000
        }
        
    },
    {
        timestamps: true,
    }
);

const messModel = mongoose.model("message", messSchema);
module.exports = messModel;