const mongoose = require("mongoose");

const TrenerSchema = new mongoose.Schema({

    registrovaniKorisnikId:{
        type:String,
        required:true
    },
    iskustvo:{
        type:String
    },
    sertifikati:{
        type:Array,
        default:[]
    },
    listaKlijenata:{
        type:Array,
        default:[]
    },
    listaTreninga:{
        type:Array,
        default:[]
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model("Trener", TrenerSchema);