const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

const classSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true
        },
        event: {
            type: ObjectId
        },
        nbPlace: {
            type: Number,
            required: true
        }
        
    },
    {
        timestamps: true,
    }
);

const classModel = mongoose.model("classe", classSchema);
module.exports = classModel;