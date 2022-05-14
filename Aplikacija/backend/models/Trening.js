const mongoose = require("mongoose");

const TreningSchema = new mongoose.Schema({

    datum:{
        type:Date

    },
    tip:{
        type:String,
        enum:["Gornji deo tela", "Donji deo tela", "Kardio"]

    },
    intenzitet:{
        type:String,
        enum:["Lak", "Srednje tezak", "Tezak"]

    },
    trajanje:{
        type:String,
        enum:["30min", "45min", "1h", "1h30min", "2h"]

    },
    brojClanova:{
        type:Number
    },
    trenerId:{
        type:String
    },
    clanovi:{
        type:Array
    },
    isOnline:{
        type:Boolean,
        default:false
    }

    
},
{timestamps:true}
)

module.exports = mongoose.model("Trening", TreningSchema);