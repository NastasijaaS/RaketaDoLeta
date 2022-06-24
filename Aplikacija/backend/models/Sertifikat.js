import mongoose from "mongoose";

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

export default mongoose.model("Sertifikat", SertifikatSchema);