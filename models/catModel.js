const mongoose = require('mongoose');

const catSchema = new mongoose.Schema(
    {
        libelle: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        events: {
            Type: [{
                event:String
            }]
        }
        
    },
    {
        timestamps: true,
    }
);

const catModel = mongoose.model("categorie", catSchema);

module.exports = catModel;