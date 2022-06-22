const router = require("express").Router();
const Korisnik = require("../models/Korisnik");
const Termin = require("../models/Termin");
const Trener = require("../models/Trener");
const Trening = require("../models/Trening");
const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik");



//vrati termine za trenera
router.get("/vratiTermineZaTrenera/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const sviTermini = await Termin.find({ trenerId: trener._id })
            res.status(200).json(sviTermini);
        }
        else {
            res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
})

//dodajTermin
router.post("/dodajTerminTreneru/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const t = await new Termin({
                trenerId: trener._id,
                datum: req.body.datum,
                vremePocetka: req.body.vremePocetka,
                vremeKraja: req.body.vremeKraja,
                slobodan: true
            })

            const terminSave = await t.save()
            res.status(200).json(terminSave)
        }
        else {
            res.status(404).json("trener nije pronadjen")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})

//izmeniTermin
router.put("/zakaziTermin/:idTermina", async (req, res) => {
    try {
        const zakazan = await Termin.findByIdAndUpdate(req.params.idTermina, {
            $set: {
                slobodan: false
            }
        })
        res.status(200).json(zakazan)

        // const zakazanSave=zakazan.save()
        // res.status(200).json(zakazanSave)

    }
    catch (err) {
        res.status(500).json(err);
    }
})

//obrisiTermin
router.delete("/obrisiTermin/:idTermina", async (req, res) => {
    try {
        await Termin.findByIdAndDelete(req.params.idTermina)
        res.status(200).json("Uspesno obrisan termin")
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//vrati slobodne za trenera po datumu
router.get("/vratiSlobodneTermineZaTreneraPoDatumu/:idTrenera/:datum", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            // const sviTermini=await Termin.find({trenerId:trener._id}, {datum:req.params.datum}, {slobodan: true})
            const sviTermini = await Termin.find({ $and: [{ trenerId: trener._id }, { datum: req.params.datum }, { slobodan: true }] })
            let sviTerminii = []
  
            for (let i = 0; i < sviTermini.length; i++) {

                let vremee = sviTermini[i].vremePocetka
                let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });

                let vrati = {
                   vreme: samovreme,
                   idTermina:sviTermini[i]._id
                }
                sviTerminii.push(vrati)
            }
            res.status(200).json(sviTerminii);
        }
        else {
            res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
})

//vrati slobodne za trenera po datumu
router.get("/vratiZauzeteTermineZaTreneraPoDatumu/:idTrenera/:datum", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) 
        {
            const sviTermini = await Termin.find({ $and: [{ trenerId: trener._id }, { datum: req.params.datum }, { slobodan: false }] })
            let sviTreninzi = []
            for (let i = 0; i < sviTermini.length; i++) {
                
                const trening = await Trening.findById(sviTermini[i].treningId)
            
                if(trening)
                { 
                 
                    const korisnik = await Korisnik.findById(trening.clanovi[0])
                
                if( korisnik){

                    const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)
                    //console.log(regK)
                    let vremee = sviTermini[i].vremePocetka
                  
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });

                    let vrati = {
                        imeK:regK.ime,
                        prezimeK:regK.prezime,
                        trener: trener._id,
                        vreme: samovreme,
                        trajanje: "1h",
                        intenzitet: trening.intenzitet,
                        treningId: trening._id,
                        korisnikId: korisnik._id
                    }
                    
                    sviTreninzi.push(vrati)

                }
                  }
            }
            res.status(200).json(sviTreninzi);
        }
        else {
            res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router