const mongoose = require("mongoose");

const EvidencijaSchema = new mongoose.Schema({

    brojTreninga:{
        type:Number

    },
    tipTreninga:{
        type:Array,
        default:[]

    },
    nivo:{
        type:String,
        enum:["nedeljni nivo","mesecni nivo"]

    },
    korisnikId:{
        type:String,
        required:true
    }
   
    
},
{timestamps:true}
)

module.exports = mongoose.model("Evidencija", EvidencijaSchema);