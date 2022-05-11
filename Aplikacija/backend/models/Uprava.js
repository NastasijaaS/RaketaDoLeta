const mongoose = require("mongoose");

const UpravaSchema = new mongoose.Schema({

    registrovaniKorisnikId:{
        type:String,
        required:true
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model("Uprava", UpravaSchema);