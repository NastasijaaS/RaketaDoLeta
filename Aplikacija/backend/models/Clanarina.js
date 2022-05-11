const mongoose = require("mongoose");

const ClanarinaSchema = new mongoose.Schema({

    cena:{
        type:String

    },
    trajanje:{
        type:String

    },
    datumUplate:{
        type:Date

    },
    korisnikId:{
        type:String,
        required:true
    },
    uslugaId:{
        type:String,
        required:true
    }
   
    
},
{timestamps:true}
)

module.exports = mongoose.model("Clanarina", ClanarinaSchema);