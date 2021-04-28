const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

const paiSchema = new mongoose.Schema(
    {
        billet: {
            type: ObjectId,
            required: true
        }
        
    },
    {
        timestamps: true,
    }
);

const paiModel = mongoose.model("paiment", paiSchema);
module.exports = paiModel;