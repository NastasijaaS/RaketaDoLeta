const mongoose = require("mongoose");

const NapredakSchema = new mongoose.Schema({

    zeljenaKilaza:{
        type:String

    },
    zeljeniProcenatMasti:{
        type:String

    },
    zeljeniProcenatMisica:{
        type:String

    },
    zeljeniProcenatProteina:{
        type:String

    },
    korisnikId:{
        type:String,
        required:true
    }
   
    
},
{timestamps:true}
)

module.exports = mongoose.model("Napredak", NapredakSchema);