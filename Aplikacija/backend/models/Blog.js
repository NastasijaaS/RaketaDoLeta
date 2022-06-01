const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({

    naslov:{
        type:String

    },
    datum:{
        type:Date

    },
    tekst:{
        type:String

    },
    tagovi:{
        type:String,
        enum:["Zdravlje","Ishrana","Fitness","Trening"]
    },
    slika:{
        type:String
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Blog", BlogSchema);