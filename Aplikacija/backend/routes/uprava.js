const router = require("express").Router();
const bcrypt = require("bcrypt");

const Uprava = require("../models/Uprava")
const Trener = require("../models/Trener")
const Korisnik = require("../models/Korisnik");
const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik")
const Clanarina = require("../models/Clanarina")
const Usluga = require("../models/Usluga")
const Sertifikat = require("../models/Sertifikat")
const Trening = require("../models/Trening")
const Zahtev = require("../models/Zahtev")
const Blog = require("../models/Blog")


//update bilo kog korisnika
router.put("/upravaUpdate/:id", async (req, res) => {

  const uprava = await RegistrovaniKorisnik.findById(req.params.id);

  if (uprava.tipKorisnika == "Uprava") {
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
  else {
    res.status(403).json("You can't update this account");
  }
});

//obrisi korisnika
router.delete("/:id", async (req, res) => {

  const uprava = await RegistrovaniKorisnik.findById(req.params.id);
  if (uprava.tipKorisnika == "Uprava") {

    try {
      await Korisnik.findByIdAndDelete(req.body.korisnikId);
      res.status(200).json("Account has been deleted");
    }
    catch (err) {
      return res.status(500).json(err);
    }

  }
});

//dodaj clanarinu korisniku
router.put("/dodajClanarinu/:idKorisnika/:idUsluge", async (req, res) => {

  try {
    const korisnik = await Korisnik.findById(req.params.idKorisnika)
    if (korisnik != null) {

      const usluga = await Usluga.findById(req.params.idUsluge)
      if (usluga != null) {
        const clanarina = await new Clanarina({
          cena: usluga.cena,
          datumUplate: new Date(),
          trajanje: 30,
          korisnikId: req.params.idKorisnika,
          uslugaId: req.params.idUsluge

        })
        const clanarinaSave = await clanarina.save()
        res.status(200).json(clanarinaSave)

      }
      else {
        res.status(404).json("Usluga nije pronadjena")
      }

    }
    else {
      res.status(404).json("Korisnik nije pronadjen")
    }

  }
  catch (err) {
    res.status(500).json(err);
  }

})

//dodaj uslugu
router.post("/dodajUslugu", async (req, res) => {

  try {

    const usluga = await new Usluga({
      cena: req.body.cena,
      opis: req.body.opis
    })

    const uslugaSave = await usluga.save()
    res.status(200).json(uslugaSave)

  }
  catch (err) {
    res.status(500).json(err);
  }

})

//izmeni uslugu
router.put("/izmeniUslugu/:idUsluge", async (req, res) => {

  try {
    const usluga = await Usluga.findById(req.params.idUsluge)
    if (usluga != null) {
      await usluga.updateOne({ $set: req.body })
      res.status(200).json(usluga);

    }
    else {
      res.status(404).json("Usluga nije pronadjena")
    }

  }
  catch (err) {
    res.status(500).json(err);
  }
})

//obrisi uslugu
router.delete("/obrisiUslugu/:idUsluge", async (req, res) => {

  try {

    await Usluga.findOneAndDelete(req.params.idUsluge)
    res.status(200).json("Usluga je uspesno obrisana")

  }
  catch (err) {
    res.status(500).json(err);
  }
});

//dodaj sertifikat treneru
router.post("/dodajSertifikat/:idTrenera", async (req, res) => {

  try {
    const trener = await Trener.findById(req.params.idTrenera)
    if (trener != null) {

      const sertifikat = await new Sertifikat({
        trenerId: req.params.idTrenera,
        opis: req.body.opis
      })

      const sertifikatSave = await sertifikat.save()
      res.status(200).json(sertifikatSave)

    }
    else {
      res.status(404).json("Trener nije pronadjen")
    }


  }
  catch (err) {
    res.status(500).json(err);
  }

})

//napravi zahtev za treningom i posalji treneru
router.post("/napraviZahtev/:idTreninga", async (req, res) => {

  try {
    const trening = await Trening.findById(req.params.idTreninga)
    if (trening != null) {

      const zahtev = await new Zahtev({
        treningId: req.params.idTreninga
      })

      const zahtevSave = await zahtev.save()
      res.status(200).json(zahtev)

    }
    else {
      res.status(404).json("Trening nije pronadjen")
    }


  }
  catch (err) {
    res.status(500).json(err);
  }

})

//obrisi odbijen trening
router.delete("/obrisiOdbijenTrening/:idZahteva", async (req, res) => {

  try {

    const zahtev = await Zahtev.findById(req.params.idZahteva)
    if (zahtev.status == "Odbijeno" || zahtev.status == "Ukinuto") {
      await Trening.findByIdAndDelete(zahtev.treningId)
      res.status(200).json("trening uspesno obrisan")
    }
    else {
      res.status(400).json("Trening je prihvacen, ne treba ga brisati")
    }

  }
  catch (err) {
    res.status(500).json(err);
  }
});


//dodaj trenera
router.post("/dodajTrenera/:id", async (req, res) => {


  try 
  {

        const kor = await RegistrovaniKorisnik.findById(req.params.id);
        if (kor != null) 
        {

            const noviTrener = await new Trener({
                registrovaniKorisnikId: kor._id,
                iskustvo: req.body.iskustvo,
                sertifikati: req.body.sertifikati,
                slika: req.body.slika,
                opis: req.body.opis
                
            })

            const trenerSave = await noviTrener.save()
            res.status(200).json(trenerSave)

        }
    

    else {
        res.status(404).json("Nije nadjen registrovani korisnik");
    }

}
catch (err) {
    res.status(500).json(err);
}

});

//dodaj korisnika, tj od registrovanog korisnika se napravi korisnik
router.put("/verifikujNalog/:idKorisnika", async (req, res) => {

  try {

         const korisnik = await Korisnik.findByIdAndUpdate(req.params.idKorisnika, {$set:{verifikovan:true}})
         res.status(200).json(korisnik);

      }
  
  catch (err) {
      res.status(500).json(err);
  }

});

//vrati verifikovane naloge
router.get("/vratiVerifikovaneNaloge", async (req, res) => {

  try {
      
    const korisnici = await Korisnik.find({verifikovan:true})
    if(korisnici!=null){
      res.status(200).json(korisnici)
    }
    else{
      res.status(404).json("nema verifikovanih korisnika")
    }

  }
  catch (err) {
      res.status(500).json(err);
  }

})

//vrati neverifikovane naloge
router.get("/vratiNeverifikovaneNaloge", async (req, res) => {

  try {
      
    const korisnici = await Korisnik.find({verifikovan:false})
    if(korisnici!=null){
      res.status(200).json(korisnici)
    }
    else{
      res.status(404).json("nema neverifikovanih korisnika")
    }

  }
  catch (err) {
      res.status(500).json(err);
  }

})



module.exports = router