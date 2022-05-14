const mongoose = require("mongoose");

const NapredakSchema = new mongoose.Schema({

    tezina:{
        type:Number

    },
    tezinaMisica:{
        type:Number

    },
    procenatProteina:{
        type:Number

    },
    procenatMasti:{
        type:Number

    },
    korisnikId:{
        type:String,
        required:true
    },
    BMI:{
        type:Number

    },
    kostanaMasa:{
        type:Number

    },
    procenatVode:{
        type:Number

    },
    bodyAge:{
        type:Number
    }

   
    
},
{timestamps:true}
)

module.exports = mongoose.model("Napredak", NapredakSchema);