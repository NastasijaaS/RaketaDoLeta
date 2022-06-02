const mongoose = require("mongoose");

const TrenerSchema = new mongoose.Schema({

    registrovaniKorisnikId:{
        type:String,
        required:true
    },
    iskustvo:{
        type:Array,
        default:[]
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
    },
    slika:{
        type:String
    },
    opis:{
        type:String
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model("Trener", TrenerSchema);