const mongoose = require("mongoose");

const ZahtevSchema = new mongoose.Schema({

    treningId:{
        type:String
    },
    registrovaniKorisnikId:{
        type:String
    },
    status:{
        type: String,
        enum:["Odobreno", "Odbijeno", "Ukinuto","Na cekanju"],
        default:"Na cekanju"
    },
    poruka:{
        type:String
    }
   
    
},
{timestamps:true}
)

module.exports = mongoose.model("Zahtev", ZahtevSchema);