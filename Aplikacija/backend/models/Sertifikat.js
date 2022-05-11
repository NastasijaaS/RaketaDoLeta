const mongoose = require("mongoose");

const SertifikatSchema = new mongoose.Schema({

   trenerId:{
       type:String

   },
   datumDobijanja:{
       type:Date

   },
   opis:{
       type:String

   },
   slika:{
       type:String
   }
    
},
{timestamps:true}
)

module.exports = mongoose.model("Sertifikat", SertifikatSchema);