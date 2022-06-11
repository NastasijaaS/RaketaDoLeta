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
const Termin = require("../models/Termin");


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

            if (lista != null) {
                //res.status(200).json(lista)
                let vrati = []
                for (let i = 0; i < lista.length; i++) {
                    const korisnik = await Korisnik.findById(lista[i])
                    //res.status(200).json(korisnik)
                    const regT = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)


                    let tr =
                    {

                        imeK: regT.ime,
                        prezimeK: regT.prezime,
                        brojtelefonaK: regT.brojTelefona,
                        email: regT.email,
                        idkorisnika: lista[i],
                        napredakId: korisnik.napredakId


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
                vreme: req.body.vreme,
                nazivGrupnogTreninga: req.body.nazivGrupnogTreninga,
                intenzitet: req.body.intenzitet,
                trajanje: req.body.trajanje,
                brojMaxClanova: req.body.brojMaxClanova,
                trenerId: trener._id,
                uslugaId: req.params.idUsluge

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

//vrati svoje treninge personalni 
/*router.get("/vratiTreningePersonalni/:id", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const zahtev=await Zahtev.find({status: "Odobreno"})
            
            const treninzi = await Trening.find({  $and: [{ trenerId: req.params.id }, { brojMaxClanova: 1 },{_id:zahtev.idTreninga}] })
    
                if (treninzi.length != 0) {
    
    
                    let vrati = []
                    for (let i = 0; i < treninzi.length; i++) {
                        const korisnik = await Korisnik.findById(treninzi[i].clanovi[0])
                        const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)
    
                        //const zahtev = await Zahtev.find({ treningId: treninzi[i]._id })

                        let datum = treninzi[i].datum;
                        let samoDatum = datum.toLocaleDateString()
                        let vremee = treninzi[i].datum;
                        let samovreme = vremee.toLocaleTimeString()
    
                        let tr = {
    
                            imeT: regK.ime,
                            prezimeT: regK.prezime,
                            brojtelefonaT: regK.brojTelefona,
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
                    res.status(404).json("nema zakazane personalne treninge")
                }
    
            }
            else {
                res.status(404).json("trener nije pronadjen")
            }
    
    
        }
        catch (err) {
            res.status(500).json(err);
        }
    
    })*/

//vrati trening personalni na cekanju
router.get("/vratiTreningePersonalniC/:id", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const zahtevi = await Zahtev.find({ status: "Na cekanju" })
            if (zahtevi.length != null) {
                let vrati = [];
                for (let i = 0; i < zahtevi.length; i++) {
                    const trening = await Trening.findOne({ _id: zahtevi[i].treningId })
                    if (trening != null && trening.trenerId == trener._id && trening.brojMaxClanova == 1) {
                        if (trening.datum > new Date()) {

                            vrati.push({ trening: trening, idZahteva: zahtevi[i]._id })
                        }
                    }
                }

                let vratiSve = []

                vrati.sort((a, b) => new Date(a.trening.datum) - new Date(b.trening.datum));


                for (let i = 0; i < vrati.length; i++) {

                    const korisnik = await Korisnik.findById(vrati[i].trening.clanovi[0])
                    const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)

                    //const zahtev = await Zahtev.find({ treningId: treninzi[i]._id })

                    let datum = vrati[i].trening.datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = vrati[i].trening.datum;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], {hour: '2-digit', minute:'2-digit'});

                    let tr = {

                        imeT: regK.ime,
                        prezimeT: regK.prezime,
                        brojtelefonaT: regK.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        tip: vrati[i].trening.tip,
                        intenzitet: vrati[i].trening.intenzitet,
                        trajanje: vrati[i].trening.trajanje,
                        idTreninga: vrati[i].trening._id,
                        isOnline: vrati[i].isOnline,
                        idZahteva: vrati[i].idZahteva,
                        status: "Na cekanju"

                    }
                    vratiSve.push(tr)

                }
                res.status(200).json(vratiSve)

            }
            else {
                res.status(200).json("Zahtevi na cekanju nisu pronadjeni")
            }


        }
        else {
            res.status(200).json("Trener nije pronadjen")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})

//vrati svoje treninge Grupne
router.get("/vratiTreningeGrupni/:id", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const treninzi = await Trening.find({ $and: [{ trenerId: req.params.id }, { brojMaxClanova: { $gte: 2 } }] })

            if (treninzi.length != 0) {


                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    let datum = treninzi[i].datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = treninzi[i].vreme;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], {hour: '2-digit', minute:'2-digit'});

                    let tr = {

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
                res.status(404).json("nema zakazane personalne treninge")
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

//prihvati trening
router.put("/prihvatiTrening/:idZahteva", async (req, res) => {

    try {
        const zahtev = await Zahtev.findById(req.params.idZahteva)
        //const trening = await Trening.findById(zahtev.treningId)
        //res.status(200).json(zahtev)
        const trening = await Trening.findById(zahtev.treningId)
        let datumm=trening.datum
        let datumm1=datumm.toLocaleDateString()
        const noviZahtev = await Zahtev.findByIdAndUpdate(req.params.idZahteva, {
            $set:{
                poruka: "Postovani, vas trening za " + datumm1 + " je odobren",
                status:"Odobreno"
            }
        })

        res.status(200).json(noviZahtev);
        

    }
    catch (err) {
        res.status(500).json(err);
    }
});

//odbij trening, ovo bi trebalo da bude funkcija koja se zove i za ukidanje treninga
router.put("/odbijTrening/:idZahteva", async (req, res) => {

    try {
        const zahtev = await Zahtev.findById(req.params.idZahteva)
        const trening = await Trening.findById(zahtev.treningId)
        //res.status(200).json(trening)
        const termin = await Termin.findOne({treningId:trening._id})
        //res.status(200).json(termin)
        let datumm=trening.datum
        let datumm1=datumm.toLocaleDateString()

        const noviZahtev = await Zahtev.findByIdAndUpdate(req.params.idZahteva, {
            $set:{
                poruka: "Postovani, vas trening za " + datumm1  + " je odbijen",
                status:"Odbijeno"
            }
        })
        //res.status(200).json(termin)

        const noviTermin = await Termin.findByIdAndUpdate(termin._id, {
            $set:{
                slobodan:true,
                treningId:""
                //vremePocetka:new Date()
            }
        })
        
        //const zahtev = await Zahtev.findByIdAndUpdate(req.params.idZahteva, { $set: { status: "Odbijeno" } })
        res.status(200).json("Zavrseno")
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
router.post("/dodajNapredak/:idTrenera/:idKorisnika", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {

            const korisnik = await Korisnik.findById(req.params.idKorisnika)
           //res.status(200).json(korisnik)
            if (korisnik != null) {

                const datum=new Date()
                //res.status(200).json(datum)
                let upisdatum=datum.toLocaleDateString()
               



                const napredak = await new Napredak({
                    korisnikId: req.params.idKorisnika,
                    tezina: req.body.tezina,
                    tezinaMisica: req.body.tezinaMisica,
                    procenatProteina: req.body.procenatProteina,
                    procenatMasti: req.body.procenatMasti,
                    BMI: req.body.BMI,
                    kostanaMasa: req.body.kostanaMasa,
                    procenatVode: req.body.procenatVode,
                    bodyAge: req.body.bodyAge,
                    datum:upisdatum

                })

                const napredakSave = await napredak.save();
                res.status(200).json(napredakSave)
                await korisnik.updateOne({ $set: { napredakId: napredak._id } })
            }



            else {
                res.status(404).json(req.params.idKorisnika + "  Korisnik nije pronadjen")
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

//izmeni napredak
router.put("/izmeniNapredak/:idNapredak", async (req, res) => {

    try {


        const napredak = await Napredak.findById(req.params.idNapredak)
        //res.status(200).json(req.body)
        //res.status(200).json(napredak)
        if (napredak != null) {

            const datum=new Date()
            let upisdatum=datum.toLocaleDateString()


            const napredaknovi = await napredak.updateOne({
                $push: {
                    tezina: req.body.tezina,
                    tezinaMisica: req.body.tezinaMisica,
                    procenatProteina: req.body.procenatProteina,
                    procenatMasti: req.body.procenatMasti,
                    BMI: req.body.BMI,
                    kostanaMasa: req.body.kostanaMasa,
                    procenatVode: req.body.procenatVode,
                    bodyAge: req.body.bodyAge,
                    datum:upisdatum
                }
            });

            res.status(200).json(napredaknovi)


        }



        else {
            res.status(404).json("Napredak nije pronadjen")
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
                    const napredak = await Napredak.findbyId(korisnik.idNapredak)
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

//dodaj evidenciju NE RADI
router.put("/izmeniEvidenciju/:idTrenera/:idTreninga", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const korisnik = await Korisnik.findById(req.body.korisnikId)
            console.log(korisnik)
            const trening=await Trening.findById(req.params.idTreninga)
           
            if (korisnik != null) {

                    const ev= await Evidencija.find(k => k.korisnikId === korisnik._id)
                    console.log(ev)

                    let brTreninga=ev.brojTreninga+1

                    if (ev!==null){

                        // console.log(ev)
                        // if(ev.tipTreninga.count===7){
                        //     const first = ev.tipTreninga[0];
                        //     console.log(first);


                        // const updated = ev.updateOne({
                        //     $pull: {
                        //         tipTreninga: first
                        //     }
                        // });

                        const final = await ev.updateOne({
                            $push:{
                                tipTreninga:trening.tipTreninga,
                                intenzitet:trening.intenzitet
                            }
                        })
                        return res.status(200).json(final)

                        // }
                        // else{
                            
                        //     res.status(200).json("Ok")
                        // }
                        

                    }
                    else{
                        
                        return res.status(404).json("evidencija nije pronadjena")
                    }

                }
                
            else {
                return res.status(404).json("Korisnik nije pronadjen")
            }

        }
        else {
            return res.status(404).json("Trener nije pronadjen")
        }

    }
    catch (err) {
        console.log(err)

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
                const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)
                if (korisnik.trenerId == trener._id) {
                    const evidencija = await Evidencija.findOne({ korisnikId: req.params.idKorisnika })
                    if (evidencija != null) {
                        let vrati = {
                            imeKorisnika: regK.ime,
                            prezimeKorisnika: regK.prezime,
                            tipTreninga: evidencija.tipTreninga,
                            intenzitet: evidencija.intenzitet
                        }
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
        const trener = await Trener.findOneAndUpdate(req.params.idTrenera, { $set: { slika: req.body.slika } })
        res.status(200).json(trener)

    }
    catch (err) {
        res.status(500).json(err);
    }

});

//dodaj opis
router.put("/dodajOpis/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findOneAndUpdate(req.params.idTrenera, { $set: { opis: req.body.opis } })
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
                    await korisnik.updateOne({ $set: { trenerId: null } })
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


//odbij trening
router.get("/vratiTreningePersonalniO/:id", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const zahtevi = await Zahtev.find({status:"Ukinuto"})
            if (zahtevi.length != null) {
                let vrati = [];
                for (let i = 0; i < zahtevi.length; i++) {
                    const trening = await Trening.findOne({ _id: zahtevi[i].treningId })
                    if (trening != null && trening.trenerId == trener._id && trening.brojMaxClanova == 1) {
                        vrati.push({ trening: trening, idZahteva: zahtevi[i]._id })
                    }
                }

                let vratiSve = []



                for (let i = 0; i < vrati.length; i++) {

                    const korisnik = await Korisnik.findById(vrati[i].trening.clanovi[0])
                    const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)

                    //const zahtev = await Zahtev.find({ treningId: treninzi[i]._id })

                    let datum = vrati[i].trening.datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = vrati[i].trening.datum;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], {hour: '2-digit', minute:'2-digit'});

                    let tr = {

                        imeT: regK.ime,
                        prezimeT: regK.prezime,
                        brojtelefonaT: regK.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        tip: vrati[i].trening.tip,
                        intenzitet: vrati[i].trening.intenzitet,
                        trajanje: vrati[i].trening.trajanje,
                        idTreninga: vrati[i].trening._id,
                        isOnline: vrati[i].isOnline,
                        idZahteva: vrati[i].idZahteva,
                        status: "Odbijeno"

                    }
                    vratiSve.push(tr)

                }
                res.status(200).json(vratiSve)

            }
            else {
                res.status(200).json("Odbijeni zahtevi nisu pronadjeni")
            }


        }
        else {
            res.status(200).json("Trener nije pronadjen")
        }


    }
    catch (err) {
        res.status(500).json(err);
    }

})




module.exports = router