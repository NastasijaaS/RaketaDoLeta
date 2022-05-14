const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({

    naslov:{
        type:String

    },
    Datum:{
        type:Date

    },
    tekst:{
        type:String

    },
    tagovi:{
        type:String,
        enum:["Zdravlje","Ishrana","Fitness","Trening"]
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Blog", BlogSchema);