const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

const scatSchema = new mongoose.Schema(
    {
        libelle: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        categorie:{
            type: ObjectId,
            required: true
        }
        
    },
    {
        timestamps: true,
    }
);

const scatModel = mongoose.model("souscategorie", scatSchema);
module.exports = scatModel;