const mongoose = require("mongoose");

const TerminSchema = new mongoose.Schema({

    trenerId:{
        type:String,
        required:true
    },
    datum:{
        type:Date
    },
    vremePocetka:{
        type:Date
    },
    vremeKraja:{
        type:Date
    },
    slobodan:{
        type:Boolean, 
        default:true
    }, 
    treningId:{
        type:String
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model("Termin", TerminSchema);