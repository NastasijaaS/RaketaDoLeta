const mongoose = require("mongoose");

const TreningSchema = new mongoose.Schema({

    datum:{
        type:Date

    },
    nazivGrupnogTreninga:{
        type:String

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
    brojMaxClanova:{
        type:Number
    },
    //brojTrenClanova:{
        //type:Number
    //},
    
    trenerId:{
        type:String
    },
    clanovi:{
        type:Array
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    imeT: {
        type: String,
        max: 20
      

    },
    prezimeT: {
        type: String,
        max: 20
    },
    //brojTrenClanova:{
        //type:String
    //}

    
},
{timestamps:true}
)

module.exports = mongoose.model("Trening", TreningSchema);