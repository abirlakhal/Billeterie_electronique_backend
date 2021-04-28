const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

const billSchema = new mongoose.Schema(
    {
        clas: {
            type: Number,
            required: true
        },
        qrCode: {
            type: ObjectId,
            required: true,
            unique: true
        }
        
    },
    {
        timestamps: true,
    }
);

const billModel = mongoose.model("billet", billSchema);
module.exports = billModel;