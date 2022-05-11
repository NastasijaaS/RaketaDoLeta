const mongoose = require("mongoose");

const KorisnikSchema = new mongoose.Schema({

    registrovaniKorisnikId:{
        type:String,
        required:true
    },
    visina:{
        type: Number
    },
    tezina:{
        type: Number
    }, 
    procenatMasti:{
        type: Number

    }, 
    BMI:{
        type: Number

    },
    tezinaMisica:{
        type: Number

    },
    procenatProteina:{
        type: Number

    },
    procenatVode:{
        type: Number

    },
    kostanaMasa:{
        type: Number

    },
    bodyAge:{
        type: Number

    },
    brojGodina:{
        type: Number

    },
    trenerId:{
        type:String
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model("Korisnik", KorisnikSchema);