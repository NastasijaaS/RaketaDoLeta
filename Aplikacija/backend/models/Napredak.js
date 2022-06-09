const mongoose = require("mongoose");

const NapredakSchema = new mongoose.Schema({

    tezina:{
        type:Array,
        default:[]

    },
    tezinaMisica:{
        type:Array,
        default:[]

    },
    procenatProteina:{
        type:Array,
        default:[]

    },
    procenatMasti:{
        type:Array,
        default:[]

    },
    korisnikId:{
        type:String,
        required:true
    },
    BMI:{
        type:Array,
        default:[]

    },
    kostanaMasa:{
        type:Array,
        default:[]

    },
    procenatVode:{
        type:Array,
        default:[]

    },
    bodyAge:{
        type:Array,
        default:[]
    }

   
    
},
{timestamps:true}
)

module.exports = mongoose.model("Napredak", NapredakSchema);