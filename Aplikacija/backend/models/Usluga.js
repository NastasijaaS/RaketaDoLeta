const mongoose = require("mongoose");

const UslugaSchema = new mongoose.Schema({

   cena:{
       type:Number

   },
   opis:{
       type:String

   }
   
    
},
{timestamps:true}
)

module.exports = mongoose.model("Usluga", UslugaSchema);