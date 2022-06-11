const router = require("express").Router();
const bcrypt = require("bcrypt");

const Korisnik = require("../models/Korisnik")
const Trening = require("../models/Trening")
const Trener = require("../models/Trener")
const Napredak = require("../models/Napredak");
const Usluga = require("../models/Usluga");
const Zahtev = require("../models/Zahtev.js");
const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik")

const Termin = require("../models/Termin")

const Sertifikat = require("../models/Sertifikat.js");
const Clanarina = require("../models/Clanarina.js");

//izmeni parametre
router.put("/izmeniParametre/:idKorisnika", async (req, res) => {
    try {

        const korisnik = await Korisnik.findByIdAndUpdate(req.params.idKorisnika, { $set: req.body })

        res.status(200).json(korisnik);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


//zakazi personalni trening
router.post("/zakaziPersonalniTrening/:idKorisnika/:idTrenera/:idTermina", async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.params.idKorisnika)

        if (korisnik != null) {

            // const trenerKorisnika = await Trener.findById(korisnik.trenerId);

            const trenerKorisnika = await Trener.findById(req.params.idTrenera);

            const novitrening = await new Trening({
                datum: req.body.datum,
                tip: req.body.tip,
                intenzitet: req.body.intenzitet,
                trajanje: req.body.trajanje,
                isOnline: req.body.isOnline,
                brojMaxClanova: 1,
                trenerId: trenerKorisnika._id

            })

            const trening = await novitrening.save();
            const noviZahtev = await new Zahtev({
                treningId: trening._id,
            })
            const zahtevSave = await noviZahtev.save()
            //res.status(200).json(zahtevSave)
            await trening.updateOne({ $push: { clanovi: req.params.idKorisnika } })// NE RADI??????????????????
            //await trening.updateOne({$set:{idZahteva:noviZahtev._id}})
            await trenerKorisnika.updateOne({ $push: { listaTreninga: trening._id } })
            if (!trenerKorisnika.listaKlijenata.includes(req.params.idKorisnika)) {
                await trenerKorisnika.updateOne({ $push: { listaKlijenata: korisnik._id } })

            }
            const azuriranTermin = await Termin.findByIdAndUpdate(req.params.idTermina, {
                $set:
                {
                    slobodan:false,
                    treningId:trening._id,
                    // trenerId: trenerKorisnika._id
                }
            })

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

//vidi trenere koji drze grupne
router.get("/vidiTrenereGrupni", async (req, res) => {

    try {
        const trener = await Trener.find({ drzigrupne: true })
        if (trener.length != 0) {
            let treneri = []
            for (let i = 0; i < trener.length; i++) {
                const t = await RegistrovaniKorisnik.findById(trener[i].registrovaniKorisnikId)

                const tr = {
                    id: trener[i]._id,
                    ime: t.ime,
                    prezime: t.prezime,
                    opis: trener[i].opis,
                    slika: trener[i].slika,
                    sertifikati: trener[i].sertifikati,
                    iskustvo: trener[i].iskustvo,
                    email: t.email,
                    // registrovaniKorisnikId:trener[i].registrovaniKorisnikId
                }

                treneri.push(tr)
            }
            res.status(200).json(treneri)
        }

        else {
            res.status(400).json("Nema trenera za prikaz")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

})
//vidi trenere koji drze personalne

router.get("/vidiTrenerePersonalni", async (req, res) => {

    try {
        const trener = await Trener.find({ drzigrupne: false })
        if (trener.length != 0) {
            let treneri = []
            for (let i = 0; i < trener.length; i++) {
                const t = await RegistrovaniKorisnik.findById(trener[i].registrovaniKorisnikId)
                const tr = {
                    id: trener[i]._id,
                    ime: t.ime,
                    prezime: t.prezime,
                    opis: trener[i].opis,
                    slika: trener[i].slika,
                    sertifikati: trener[i].sertifikati,
                    iskustvo: trener[i].iskustvo,
                    email: t.email,
                    // registrovaniKorisnikId:trener[i].registrovaniKorisnikId
                }

                treneri.push(tr)
            }
            res.status(200).json(treneri)
        }
        else {
            res.status(400).json("Nema trenera za prikaz")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//pogledaj sve trenere
router.get("/vidiTrenereSvi", async (req, res) => {

    try {
        const trener = await Trener.find()
        //res.status(200).json(trener)
        if (trener.length != 0) {
            let treneri = []
            for (let i = 0; i < trener.length; i++) {
                const t = await RegistrovaniKorisnik.findById(trener[i].registrovaniKorisnikId)
                let tr = {
                    id: trener[i]._id,
                    ime: t.ime,
                    prezime: t.prezime,
                    opis: trener[i].opis,
                    slika: trener[i].slika,
                    sertifikati: trener[i].sertifikati,
                    iskustvo: trener[i].iskustvo,
                    email: t.email,
                    // registrovaniKorisnikId:trener[i].registrovaniKorisnikId
                }


                treneri.push(tr)
                //res.status(200).json(treneri)
            }
            res.status(200).json(treneri)
        }

        else {
            res.status(404).json("Nema trenera za prikaz")
        }


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

router.get("/vidiZakazaneTreningePersonalni/:idKorisnika", async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        //res.status(200).json(korisnik)
        if (korisnik != null) {
            const treninzi = await Trening.find({ $and: [{ clanovi: req.params.idKorisnika }, { brojMaxClanova: 1 }] })

          

            //const treninzi = await Trening.find( {clanovi:req.params.idKorisnika })
            if (treninzi.length != 0) {
                //res.status(200).json(treninzi)
                treninzi.sort((a, b) => new Date(a.datum) - new Date(b.datum));

               

                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    const trener = await Trener.findById(treninzi[i].trenerId)
                    const regT = await RegistrovaniKorisnik.findById(trener.registrovaniKorisnikId)
                    const zahtev = await Zahtev.findOne({ treningId: treninzi[i]._id })
                    //res.status(200).json(zahtev);
                   

                    let datum = treninzi[i].datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = treninzi[i].datum;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], {hour: '2-digit', minute:'2-digit'});
                   
                    if (datum > new Date()) {

                        if (zahtev != null) {
                            let tr = {

                                imeT: regT.ime,
                                prezimeT: regT.prezime,
                                brojtelefonaT: regT.brojTelefona,
                                datum: samoDatum,
                                vremeee: samovreme,
                                tip: treninzi[i].tip,
                                intenzitet: treninzi[i].intenzitet,
                                trajanje: treninzi[i].trajanje,
                                id: treninzi[i]._id,
                                isOnline: treninzi[i].isOnline,
                                status: zahtev.status
                                //status:treninzi[i].status
                            }
                            //res.status(200).json(tr);
                            vrati.push(tr)
                        }
                    }
                }
                res.status(200).json(vrati)
                //res.status(200).json(zahtev)
            }
            else {
                res.status(404).json("nema nijedan zakazani personalni trening")
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



//vidi sve zakazane treninge 
router.get("/vidiZakazaneTreningeSve/:idKorisnika", async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {
            const treninzi = await Trening.find({ clanovi: korisnik._id })
            //const treninzi = await Trening.find( {clanovi:korisnik._id })

            if (treninzi.length != 0) {


                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    const trener = await Trener.findById(treninzi[i].trenerId)
                    const regT = await RegistrovaniKorisnik.findOne({ _id: trener.registrovaniKorisnikId })
                    let datum = treninzi[i].datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = treninzi[i].datum;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], {hour: '2-digit', minute:'2-digit'});


                    let tr = {

                        imeT: regT.ime,
                        prezimeT: regT.prezime,
                        brojtelefonaT: regT.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        tip: treninzi[i].tip,
                        intenzitet: treninzi[i].intenzitet,
                        trajanje: treninzi[i].trajanje,
                        id: treninzi[i]._id,
                        isOnline: treninzi[i].isOnline

                    }
                    vrati.push(tr)
                }
                res.status(200).json(vrati)


            }
            else {
                res.status(404).json("nema nijedan zakazani personalni trening")
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

//pregledaj sve zakazane treninge grupne
router.get("/vidiZakazaneTreningeGrupni/:idKorisnika", async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {
            const treninzi = await Trening.find({ $and: [{ clanovi: korisnik._id }, { brojMaxClanova: { $gte: 2 } }] })
            //const treninzi = await Trening.find( {clanovi:korisnik._id })

            if (treninzi.length != 0) {


                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    const trener = await Trener.findById(treninzi[i].trenerId)
                    const regT = await RegistrovaniKorisnik.findOne({ _id: trener.registrovaniKorisnikId })
                    let datum = treninzi[i].datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = treninzi[i].vreme;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], {hour: '2-digit', minute:'2-digit'});


                    let tr = {

                        imeT: regT.ime,
                        prezimeT: regT.prezime,
                        brojtelefonaT: regT.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        nazivGrupnogTreninga: treninzi[i].nazivGrupnogTreninga,
                        intenzitet: treninzi[i].intenzitet,
                        trajanje: treninzi[i].trajanje,
                        id: treninzi[i]._id,
                        isOnline: treninzi[i].isOnline

                    }
                    vrati.push(tr)
                }
                res.status(200).json(vrati)


            }
            else {
                res.status(404).json("nema nijedan zakazani grupni trening")
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
//prijavi se za grupni trening 
router.put("/prijavaGrupniTrening/:idKorisnika/:idTreninga", async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.params.idKorisnika)

        if (korisnik != null) {

            const tr = await Trening.findById(req.params.idTreninga)
            if (tr != null) {

                if (tr.clanovi.length < tr.brojMaxClanova) {
                    //res.status(200).json(brojTren)
                    await tr.updateOne({ $push: { clanovi: korisnik._id } })

                    res.status(200).json(tr);
                }
                else {
                    res.status(404).json("Nema mesta u ovom terminu!")
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

//pregledaj sve dostupne grupne treninge
router.get("/vidiGrupneTreninge/:idUsluge/:datum", async (req, res) => {

    try {

        const treninzi = await Trening.find({ $and: [{ uslugaId: req.params.idUsluge }, { datum: req.params.datum }] })
        if (treninzi.length != 0) {
            let vrati = []
            for (let i = 0; i < treninzi.length; i++) {
                const trener = await Trener.findById(treninzi[i].trenerId)
                const regT = await RegistrovaniKorisnik.findById(trener.registrovaniKorisnikId)

                let datum = treninzi[i].datum;
                let samoDatum = datum.toLocaleDateString()
                let vremee = treninzi[i].vreme;
                let samovreme = vremee.toLocaleTimeString(['hr-HR'], {hour: '2-digit', minute:'2-digit'});

                //const usluga=await Usluga.findbyId(treninzi[i].uslugaId)
                let brojzauzetih = treninzi[i].clanovi.length
                let slobodanbroj = treninzi[i].brojMaxClanova - brojzauzetih;


                let tr = {

                    imeT: regT.ime,
                    prezimeT: regT.prezime,
                    //nazivUsluge:usluga.naziv,
                    datum: samoDatum,
                    vreme: samovreme,
                    nazivGrupnogTreninga: treninzi[i].nazivGrupnogTreninga,
                    intenzitet: treninzi[i].intenzitet,
                    trajanje: treninzi[i].trajanje,
                    brojslobodnih: slobodanbroj, 
                    treningID: treninzi[i]._id
                }
                vrati.push(tr)
            }
            res.status(200).json(vrati)
        }
        else {
            res.status(404).json("nema zakazanih treninga")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//pregledaj grupne treninge, al tipove, po usluzi se vraca
router.get("/vidiGrupneUsluge", async (req, res) => {

    try {
        const usluge = await Usluga.find({ treningGrupni: true })
        if (usluge.length != 0) {
            res.status(200).json(usluge)
        }
        else {
            res.status(400).json("Nema treninga za prikaz")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})

router.get("/vidiTreningeZaUslugu/:idUsluge/:datum", async (req, res) => {

    try {
        const treninzi = await Trening.find({ $and: [{ uslugaId: req.params.idUsluge }, { datum: req.params.datum }] })
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

            const napredak = await Napredak.findById(korisnik.napredakId)

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
router.get("/vidiNapredakPoslednji/:idKorisnika", async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {

            const napredak = await Napredak.findById(korisnik.napredakId)
            //res.status(200).json(napredak)

            if (napredak != null) {
                let vrati = []
                let tr = {
                    tezina: napredak.tezina.slice(-1),
                    tezinaMisica: napredak.tezinaMisica.slice(-1),
                    procenatProteina: napredak.procenatProteina.slice(-1),
                    procenatMasti: napredak.procenatMasti.slice(-1),
                    BMI: napredak.BMI.slice(-1),
                    kostanaMasa: napredak.kostanaMasa.slice(-1),
                    procenatVode: napredak.procenatVode.slice(-1),
                    bodyAge: napredak.bodyAge.slice(-1),
                    datum:napredak.datum.slice(-1)



                }
                vrati.push(tr)
                res.status(200).json(vrati)
            
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
            // const clanarina = await Clanarina.find({ korisnikId: req.params.idKorisnika })
            const clanarina = await Clanarina.findById(korisnik.clanarinaId)
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