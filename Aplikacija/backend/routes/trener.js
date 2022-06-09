const router = require("express").Router();
const bcrypt = require("bcrypt");
const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik");
const Korisnik = require("../models/Korisnik");
const Trener = require("../models/Trener");
const { route } = require("./auth");
const Trening = require("../models/Trening");
const Napredak = require("../models/Napredak");
//const { resetWatchers } = require("nodemon/lib/monitor/watch");
const Zahtev = require("../models/Zahtev");
const Evidencija = require("../models/Evidencija");
const Usluga = require("../models/Usluga");


//dodaj korisnika
router.post("/dodajKorisnika/:id/:korid", async (req, res) => {

    
    try {


        const trener = await Trener.findById(req.params.id);
        if (trener != null) {

            const kor = await Korisnik.findById(req.params.korid);
            if (kor != null) {
                await kor.updateOne({
                    $set:
                    {
                        visina: req.body.visina,
                        zeljenaTezina: req.body.zeljenaTezina,
                        zeljeniProcenatMasti: req.body.zeljeniProcenatMasti,
                        zeljenaTezinaMisica: req.body.zeljenaTezinaMisica,
                        zeljeniProcenatProteina: req.body.zeljeniProcenatProteina,
                        brojGodina: req.body.brojGodina
                    }
                  })
            
                

                await kor.updateOne({ trenerId: trener._id })
                await trener.updateOne({ $push: { listaKlijenata: kor._id } });
                res.status(200).json(kor);

            }
            else {
                res.status(404).json("Nije nadjen korisnik");
            }

        }
        else {
            res.status(404).json("Nije nadjen trener");
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

});

//izmeni korisnika
router.put("/izmeniKorisnika/:id", async (req, res) => {

    try {

        const trener = await Trener.findById(req.params.id)
        if (trener != null) {

            const korisnik = await Korisnik.findById(req.body.korisnikId)
            if (korisnik != null) {

                if (trener.listaKlijenata.includes(korisnik._id)) {
                    await korisnik.updateOne({ $set: req.body })
                    res.status(200).json(korisnik);

                }
                else {
                    res.status(400).json("Mozete menjati samo svoje klijente");
                }

            }
            else {
                res.status(404).json("Nije pronadjen korisnik")
            }

        }
        else {
            res.status(404).json("Nije pronadjen trener")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
});

//obrisi svog klijenta

router.delete("/obrisiKorisnika/:id", async (req, res) => {

    try {

        const trener = await Trener.findById(req.params.id)
        if (trener != null) {

            const korisnik = await Korisnik.findById(req.body.korisnikId)
            if (korisnik != null) {

                if (trener.listaKlijenata.includes(korisnik._id)) {
                    await trener.updateOne({ $pull: { listaKlijenata: korisnik._id } });
                    await korisnik.deleteOne();
                    res.status(200).json("Uspesno obrisan klijent");

                }
                else {
                    res.status(400).json("Ovaj korisnik nije vas klijent");
                }

            }
            else {
                res.status(404).json("Nije pronadjen korisnik")
            }

        }
        else {
            res.status(404).json("Nije pronadjen trener")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
});

//vrati svoje klijente
router.get("/vratiKorisnike/:id", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const lista = trener.listaKlijenata;

            if(lista!=null)
            {
                //res.status(200).json(lista)
                let vrati = []
                for(let i=0;i<lista.length;i++)
                {
                    const korisnik = await Korisnik.findById(lista[i])
                    //res.status(200).json(korisnik)
                    const regT = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)


                    let tr = 
                    {
  
                        imeK:regT.ime,
                        prezimeK:regT.prezime,
                        brojtelefonaK:regT.brojTelefona,
                        email:regT.email,
                        idkorisnika:lista[i]
 
                    
                    }
                    vrati.push(tr)
                    
                }
                  
                  res.status(200).json(vrati)
                  
              }
              else {
                  res.status(404).json("nema nijednog korisnika")
              }
  
            }
          else {
              res.status(404).json("trener nije pronadjen")
          }
  
  
      }
      catch (err) {
          res.status(500).json(err);
      }
  
  })


//zakazi grupni trening
router.post("/zakaziGrupniTrening/:id/:idUsluge", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id)
        //const regT = await RegistrovaniKorisnik.findOne({_id:trener.registrovaniKorisnikId})
        //const usluga=await Usluga.findById(req.params.id)
        //res.status(200).json(regT);
        if (trener != null) {

            const novitrening = await new Trening({


                //imeT:regT.ime,
                //prezimeT:regT.prezime,
                datum: req.body.datum,
                vreme:req.body.vreme,
                nazivGrupnogTreninga: req.body.nazivGrupnogTreninga,
                intenzitet: req.body.intenzitet,
                trajanje:req.body.trajanje,
                brojMaxClanova: req.body.brojMaxClanova,
                trenerId: trener._id,
                uslugaId:req.params.idUsluge

            })

            const trening = await novitrening.save();
            await trener.updateOne({ $push: { listaTreninga: trening._id } });
            res.status(200).json(trening);
        }
        else {
            res.status(404).json("Trener nije pronadjen")
        }
    }
    catch (err) {
        res.status(500).json(err);
    }

})

//vrati svoje treninge
router.get("/vratiTreninge/:id", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const treninzi = await Trening.find({ trenerId: req.params.id })
            if (treninzi != null) {
                res.status(200).json(treninzi)
            }
            else {
                res.status(400).json("nema treninga za prikaz")
            }

        }
        else {
            res.status(404).json("Trener nije pronadjen")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

});

//prihvati trening

router.put("/prihvatiTrening/:idZahteva", async (req, res) => {

    try {
        const zahtev = await Zahtev.findOneAndUpdate(req.params.idZahteva, { $set: { status: "Odobreno" } })
        res.status(200).json(zahtev)
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//odbij trening, ovo bi trebalo da bude funkcija koja se zove i za ukidanje treninga
router.put("/odbijTrening/:idZahteva", async (req, res) => {

    try {
        const zahtev = await Zahtev.findOneAndUpdate(req.params.idZahteva, { $set: { status: "Odbijeno" } })
        res.status(200).json(zahtev)
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//izmeni trening
/*router.put("/izmeniTrening/:idTrenera/:idTreninga", async(req, res)=>{
 try{
     const trener=await Trener.findById(req.params.idTrenera);
     //res.status(200).json(trener);

     if (trener!=null){
         const trening=await Trening.findById(req.params.idTreninga)
         if(trening!=null){
             if(trening.trenerId==trener._id){
                 await trening.updateOne({$set: req.body})
                 res.status(200).json(trening);
             }
             else{
                 res.status(400).json("Mozete izmeniti samo svoj trening")
             }

         }
         else{
             res.status(404).json("Trening nije pronadjen")
         }

     }
     else{
         res.status(404).json("Trener nije pronadjen")
     }

 }
 catch(err){
     res.status(500).json(err);
 }
})*/

//dodaj napredak za klijenta
router.post("/dodajNapredak/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {

            const korisnik = await Korisnik.findById(req.body.korisnikId)
            if (korisnik != null) {

                // if(korisnik.trenerId==trener._id){

                const napredak = await new Napredak({
                    "korisnikId": req.body.korisnikId,
                    "kilaza": req.body.kilaza,
                    "tezina": req.body.tezina,
                    "tezinaMisica": req.body.tezinaMisica,
                    "procenatProteina": req.body.procenatProteina,
                    "procenatMasti": req.body.procenatMasti,
                    "BMI": req.body.BMI,
                    "kostanaMasa": req.body.kostanaMasa,
                    "procenatVode": req.body.procenatVode,
                    "bodyAge": req.body.bodyAge

                })

                const napredakSave = await napredak.save();
                res.status(200).json(napredakSave)

                // }
                // else{
                //     res.status(400).json("Mozete dodati napredak samo svom korisniku")
                // }

            }
            else {
                res.status(404).json(req.body.korisnikId + "  Korisnik nije pronadjen")
            }

        }
        else {
            res.status(404).json("Trener nije pronadjen")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//vidi napredak za klijenta
router.get("/vidiNapredak/:idTrenera/:idKorisnika", async (req, res) => {

    try {

        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const korisnik = await Korisnik.findById(req.params.idKorisnika)
            if (korisnik != null) {
                if (korisnik.trenerId == trener._id) {
                    const napredak = await Napredak.findOne({ korisnikId: req.params.idKorisnika })
                    if (napredak != null) {
                        res.status(200).json(napredak)
                    }
                    else {
                        res.status(404).json("ne postoji dodat napredak za ovog klijenta")
                    }

                }
                else {
                    res.status(400).json("mozete videti napredak samo svog klijenta")
                }

            }
            else {
                res.status(404).json("korisnik nije pronadjen")
            }

        }
        else {
            res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//dodaj evidenciju
router.post("/dodajEvidenciju/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const korisnik = await Korisnik.findById(req.body.korisnikId)
            if (korisnik != null) {

                if (korisnik.trenerId == trener._id) {

                    const evidencija = await new Evidencija({
                        "korisnikId": req.body.korisnikId,
                        "brojTreninga": req.body.brojTreninga,
                        "tipTreninga": req.body.tipTreninga,
                        "nivo": req.body.nivo
                    })

                    const evidencijaSave = await evidencija.save();
                    res.status(200).json(evidencijaSave)

                }
                else {
                    res.status(400).json("Mozete dodati evidenciju samo svom korisniku")
                }

            }
            else {
                res.status(404).json("Korisnik nije pronadjen")
            }

        }
        else {
            res.status(404).json("Trener nije pronadjen")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//pregledaj evidenciju
router.get("/vidiEvidenciju/:idTrenera/:idKorisnika", async (req, res) => {

    try {

        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const korisnik = await Korisnik.findById(req.params.idKorisnika)
            if (korisnik != null) {
                if (korisnik.trenerId == trener._id) {
                    const evidencija = await Evidencija.findOne({ korisnikId: req.params.idKorisnika })
                    if (evidencija != null) {
                        res.status(200).json(evidencija)
                    }
                    else {
                        res.status(404).json("ne postoji dodata evidencija za ovog klijenta")
                    }

                }
                else {
                    res.status(400).json("mozete videti evidenciju samo svog klijenta")
                }

            }
            else {
                res.status(404).json("korisnik nije pronadjen")
            }

        }
        else {
            res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//izmeni trening
router.put("/izmeniTrening/:idTrenera/:idTreninga", async (req, res) => {
    try {
        const trener = await Trener.findById(req.params.idTrenera);

        if (trener != null) {
            const trening = await Trening.findById(req.params.idTreninga)
            if (trening != null) {
                if (trening.trenerId == trener._id) {
                    await trening.updateOne({ $set: req.body })
                    res.status(200).json(trening);
                }
                else {
                    res.status(400).json("Mozete izmeniti samo svoj trening")
                }

            }
            else {
                res.status(404).json("Trening nije pronadjen")
            }

        }
        else {
            res.status(404).json("Trener nije pronadjen")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
})
 //zakazi grupni trening
 /*router.post("/zakaziGrupniTrening/:id", async(req, res)=>{

    try{
        const trener=await Trener.findById(req.params.id)
        if (trener!=null){

            const novitrening=await new Trening({
                datum:req.body.datum,
                tip:req.body.tip,
                intenzitet:req.body.intenzitet,
                brojClanova:req.body.brojClanova,
                trener:trener._id
            })

            const trening=await novitrening.save();
            await trener.updateOne({$push:{listaTreninga: trening._id}});
            res.status(200).json(trening);
        }
        else{
            res.status(404).json("Trener nije pronadjen")
        }

    }
    catch(err){
        res.status(500).json(err);
    }

})*/
//dodaj profilnu sliku
router.put("/dodajSliku/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findOneAndUpdate(req.params.idTrenera, {$set:{slika:req.body.slika}})
        res.status(200).json(trener)

    }
    catch (err) {
        res.status(500).json(err);
    }

});

//dodaj opis
router.put("/dodajOpis/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findOneAndUpdate(req.params.idTrenera, {$set:{opis:req.body.opis}})
        res.status(200).json(trener)

    }
    catch (err) {
        res.status(500).json(err);
    }

});

// obrisi svog klijenta
router.put("/obrisiSvogKlijenta/:id", async (req, res) => {

    try {

        const trener = await Trener.findById(req.params.id)
        if (trener != null) {

            const korisnik = await Korisnik.findById(req.body.korisnikId)
            if (korisnik != null) {

                if (trener.listaKlijenata.includes(korisnik._id)) {
                    await trener.updateOne({ $pull: { listaKlijenata: korisnik._id } });
                    await korisnik.updateOne({$set:{trenerId:null}})
                    res.status(200).json("Uspesno obrisan klijent");

                }
                else {
                    res.status(400).json("Ovaj korisnik nije vas klijent");
                }

            }
            else {
                res.status(404).json("Nije pronadjen korisnik")
            }

        }
        else {
            res.status(404).json("Nije pronadjen trener")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router