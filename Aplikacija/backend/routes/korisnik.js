const router = require("express").Router();
const bcrypt = require("bcrypt");

const Korisnik = require("../models/Korisnik")
const Trening = require("../models/Trening")
const Trener = require("../models/Trener")
const Napredak = require("../models/Napredak");
const Usluga = require("../models/Usluga");
const Zahtev = require("../models/Zahtev.js");
const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik")


//zakazi personalni trening
router.post("/zakaziPersonalniTrening/:idKorisnika", async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.params.id)

        if (korisnik != null) {

            const trenerKorisnika = await Trener.findById(korisnik.trenerId);
            const novitrening = await new Trening({
                datum: req.body.datum,
                tip: req.body.tip,
                intenzitet: req.body.intenzitet,
                trajanje: req.body.trajanje,
                trenerId: trenerKorisnika._id,

            })

            const trening = await novitrening.save();
            await trening.updateOne({ $push: { clanovi: korisnik._id } })
            await trenerKorisnika.updateOne({ $push: { listaTreninga: trening._id } })
            res.status(200).json(trening);
        }
        else {
            res.status(404).json("Korisnik nije pronadjen")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})

//izmeni trening
router.put("/izmeniTrening/:idKorisnika/:idTreninga", async (req, res) => {
    //dodaj i broj clanova, ako je veci od 1 onda da ne moze da se menja
    try {
        const korisnik = await Korisnik.findById(req.params.idKorisnika);
        //res.status(200).json(korisnik);

        if (korisnik != null) {
            const trening = await Trening.findById(req.params.idTreninga)
            if (trening != null) {
                if (trening.clanovi.includes(korisnik._id)) {
                    await trening.updateOne({ $set: req.body })
                    res.status(200).json(trening);
                }
                else {
                    res.status(400).json("Mozete izmeniti samo svoj personalni trening")
                }

            }
            else {
                res.status(404).json("Trening nije pronadjen")
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

//ukini trening
router.put("/ukiniTrening/:idTreninga", async (req, res) => {

    try {
        const trening = await Trening.findById(req.params.idTreninga)
        if (trening != null) {
            const zahtev = await Zahtev.findOneAndUpdate({ treningId: req.params.idTreninga }, { $set: { status: "Ukinuto" } })
            res.status(200).json(zahtev)
        }
        else {
            res.status(400).json("Nije pronadjen trening")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
});

//pregledaj sve trenere
router.get("/vidiTrenere", async (req, res) => {

    try {
        const treneri = await RegistrovaniKorisnik.find({ tipKorisnika: "Trener" })
        if (treneri.length != 0) {
            res.status(200).json(treneri)

        }

        else {
            res.status(400).json("Nema trenera za prikaz")
        }


        // try {
        //     const trener = await Trener.find().populate('registrovaniKorisnikId')

        //     if (trener.length != 0) {
        //         res.status(200).json(trener)
        //     }
        //     else {
        //         res.status(400).json("Nema trenera za prikaz")
        //     }

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//pregledaj sve usluge
router.get("/vidiUsluge", async (req, res) => {

    try {
        const usluge = await Usluga.find()
        if (usluge.length != 0) {
            res.status(200).json(usluge)
        }
        else {
            res.status(400).json("Nema usluga za prikaz")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})

//pregledaj sve zakazane treninge
//ispravi ovu funkciju
router.get("/vidiZakazaneTreninge/:idKorisnika", async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {
            const treninzi = await Trening.find({ clanovi: req.params.idKorisnika })

            if (treninzi.length != 0) {
                res.status(200).json(treninzi)
            }
            else {
                res.status(400).json("nema nijednog zakazanog treninga")
            }

        }
        else {
            res.status(404).json("korisnik nije pronadjen")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})

//pregledaj sve dostupne grupne treninge
router.get("/vidiGrupneTreninge", async (req, res) => {

    try {
        const treninzi = await Trening.find({ brojClanova: { $gte: 2 } })
        if (treninzi.length != 0) {
            res.status(200).json(treninzi)
        }
        else {
            res.status(400).json("Nema treninga za prikaz")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})

//uplati clanarinu

//vidi napredak 
router.get("/vidiNapredak/:idKorisnika", async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {

            const napredak = await Napredak.findOne({ korisnikId: req.params.idKorisnika })

            if (napredak != null) {
                res.status(200).json(napredak)
            }
            else {
                res.status(404).json("ne postoji dodat napredak za ovog klijenta")
            }

        }
        else {
            res.status(404).json("korisnik nije pronadjen")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})

//vidi clanarinu
router.get("/vidiClanarinu/:idKorisnika", async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {
            const clanarina = await Clanarina.findOne({ korisnikId: req.params.idKorisnika })
            if (clanarina != null) {
                res.status(200).json(clanarina)

            }
            else {
                res.status(404).json("Nije pronadjena clanarina za ovog korisnika")
            }

        }
        else {
            res.status(404).json("Nije pronadjen korisnik")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})



module.exports = router