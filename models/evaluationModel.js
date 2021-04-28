const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

const evalSchema = new mongoose.Schema(
    {
        event: {
            type: ObjectId,
            required: true
        },
        rang: {
            type: Number,
            required: true,
            enum: [0, 1, 2, 3, 4, 5]
        }
        
    },
    {
        timestamps: true,
    }
);

const evalModel = mongoose.model("evaluation", evalSchema);
module.exports = evalModel;