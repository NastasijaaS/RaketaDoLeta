const router = require("express").Router();
const bcrypt=require("bcrypt");

const Uprava = require("../models/Uprava")
const Trener = require("../models/Trener")
const Korisnik=require("../models/Korisnik");
const RegistrovaniKorisnik=require("../models/RegistrovaniKorisnik")
const Clanarina=require("../models/Clanarina")
const Usluga=require("../models/Usluga")
const Sertifikat=require("../models/Sertifikat")
const Trening=require("../models/Trening")
const Zahtev=require("../models/Zahtev")



//dodaj registrovanog korisnika
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = await new RegistrovaniKorisnik({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        tipKorisnika:req.body.tipKorisnika
      });
  
      //save user and respond
      const user = await newUser.save();

      let novi=null;
      if(req.body.tipKorisnika==="Korisnik"){
          novi=await new Korisnik({
              registrovaniKorisnikId:user._id
          })
      }

      else if(req.body.tipKorisnika==="Trener"){
          novi=await new Trener({
              registrovaniKorisnikId:user._id
          })
      }
      else{
          novi=await new Uprava({
              registrovaniKorisnikId:user._id
          })
      }

      const novi2=await novi.save();

      res.status(200).json(novi2);
    } catch (err) {
      res.status(500).json(err)
    }
  });


  //update bilo kog korisnika
  router.put("/upravaUpdate/:id", async (req, res) => {

    const uprava=await RegistrovaniKorisnik.findById(req.params.id);
    
    if (uprava.tipKorisnika=="Uprava"){
        if (req.body.password) {
            try {
              const salt = await bcrypt.genSalt(10);
              req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
              return res.status(500).json(err);
            }
          }
          try {
            const user = await RegistrovaniKorisnik.findByIdAndUpdate(req.body.registrovaniKorisnikId, {
              $set: req.body,
            });
            res.status(200).json("Account has been updated");
          } catch (err) {
            return res.status(500).json(err);
          }
    }
    else{
        res.status(403).json("You can't update this account");
    }
  });

  //obrisi korisnika
  router.delete("/:id", async (req, res) => {

    const uprava=await RegistrovaniKorisnik.findById(req.params.id);
    if(uprava.tipKorisnika=="Uprava"){
    
      try {
        await Korisnik.findByIdAndDelete(req.body.korisnikId);
        res.status(200).json("Account has been deleted");
      } 
      catch (err) {
        return res.status(500).json(err);
      }
    
}
  });

  //izmeni ove metode za clanarinu tako da se doda i usluga
  //dodaj clanarinu korisniku

  router.post("/dodajClanarinu/:idKorisnika", async(req, res)=>{

    try{
        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if(korisnik!=null){

          const clanarina=await new Clanarina({
            cena:req.body.cena,
            korisnikId:req.params.idKorisnika
          })

          const clanarinaSave=await clanarina.save()
          res.status(200).json(clanarinaSave)

        }
        else{
          res.status(404).json("Korisnik nije pronadjen")
        }

    }
    catch(err){
        res.status(500).json(err);
    }

})

//vidi clanarinu

router.get("/vidiClanarinu/:idKorisnika", async(req, res)=>{

  try{

    const korisnik=await Korisnik.findById(req.params.idKorisnika)
    if(korisnik!=null){
      const clanarina=await Clanarina.findOne({korisnikId:req.params.idKorisnika})
      if(clanarina!=null){
        res.status(200).json(clanarina)

      }
      else{
        res.status(404).json("Nije pronadjena clanarina za ovog korisnika")
      }

    }
    else{
      res.status(404).json("Nije pronadjen korisnik")
    }
      

  }
  catch(err){
      res.status(500).json(err);
  }

})

//dodaj uslugu

router.post("/dodajUslugu", async(req, res)=>{

  try{

    const usluga=await new Usluga({
      cena:req.body.cena,
      opis:req.body.opis
    })

    const uslugaSave=await usluga.save()
    res.status(200).json(uslugaSave)

  }
  catch(err){
      res.status(500).json(err);
  }

})

//izmeni uslugu

router.put("/izmeniUslugu/:idUsluge", async(req, res)=>{
  
  try{
    const usluga=await Usluga.findById(req.params.idUsluge)
    if(usluga!=null){
        await usluga.updateOne({$set: req.body})
        res.status(200).json(usluga);

    }
    else{
      res.status(404).json("Usluga nije pronadjena")
    }
     
  }
  catch(err){
      res.status(500).json(err);
  }
})

//obrisi uslugu
router.delete("/obrisiUslugu/:idUsluge", async (req, res) => {

  try{

    await Usluga.findOneAndDelete(req.params.idUsluge)
    res.status(200).json("Usluga je uspesno obrisana")

  }
  catch(err){
      res.status(500).json(err);
  }
 });

 //dodaj sertifikat treneru

 router.post("/dodajSertifikat/:idTrenera", async(req, res)=>{

  try{
      const trener=await Trener.findById(req.params.idTrenera)
      if(trener!=null){

        const sertifikat=await new Sertifikat({
          trenerId:req.params.idTrenera,
          opis:req.body.opis
        })

        const sertifikatSave=await sertifikat.save()
        res.status(200).json(sertifikatSave)

      }
      else{
        res.status(404).json("Trener nije pronadjen")
      }
    

  }
  catch(err){
      res.status(500).json(err);
  }

})

//napravi zahtev za treningom i posalji treneru

router.post("/napraviZahtev/:idTreninga", async(req, res)=>{

  try{
     const trening = await Trening.findById(req.params.idTreninga)
     if(trening!=null){

      const zahtev = await new Zahtev({
        treningId:req.params.idTreninga
      })

      const zahtevSave=await zahtev.save()
      res.status(200).json(zahtev)

     }
     else{
       res.status(404).json("Trening nije pronadjen")
     }
    

  }
  catch(err){
      res.status(500).json(err);
  }

})

//obrisi odbijen trening
router.delete("/obrisiOdbijenTrening/:idZahteva", async (req, res) => {

  try{

    const zahtev=await Zahtev.findById(req.params.idZahteva)
    if(zahtev.status=="Odbijeno" || zahtev.status=="Ukinuto"){
      await Trening.findByIdAndDelete(zahtev.treningId)
      res.status(200).json("trening uspesno obrisan")
    }
    else{
      res.status(400).json("Trening je prihvacen, ne treba ga brisati")
    }

  }
  catch(err){
      res.status(500).json(err);
  }
 });



module.exports = router