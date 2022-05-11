const mongoose = require("mongoose");

const ZahtevSchema = new mongoose.Schema({

    treningId:{
        type:String
    },
    status:{
        type: String,
        enum:["Odobreno", "Odbijeno", "Ukinuto"]
    },
    poruka:{
        type:String
    }
   
    
},
{timestamps:true}
)

module.exports = mongoose.model("Zahtev", ZahtevSchema);