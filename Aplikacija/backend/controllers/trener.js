import express from "express";
const router = express.Router();
import Trener from "../models/Trener.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"


//dodaj profilnu sliku
export const dodajSliku = async (req, res) => {

    try {
        const trener = await Trener.findOneAndUpdate(req.params.idTrenera, { $set: { slika: req.body.slika } })
        res.status(200).json(trener)

    }
    catch (err) {
        res.status(500).json(err);
    }

};

//dodaj opis
export const dodajOpis = async (req, res) => {

    try {
        const trener = await Trener.findOneAndUpdate(req.params.idTrenera, { $set: { opis: req.body.opis } })
        res.status(200).json(trener)

    }
    catch (err) {
        res.status(500).json(err);
    }

};

//vidi trenere koji drze grupne
export const vidiTrenereGrupni = async (req, res) => {

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

}

//vidi trenere koji drze personalne
export const vidiTrenerePersonalni =async (req, res) => {

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

}

//pogledaj sve trenere
export const vidiTrenereSvi = async (req, res) => {

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

}

//dodaj trenera
export const dodajTrenera = async (req, res) => {
  try {

    const kor = await RegistrovaniKorisnik.findById(req.params.id);
    if (kor != null) {
      const noviTrener = await new Trener({
        registrovaniKorisnikId: kor._id,
        iskustvo: req.body.iskustvo,
        sertifikati: req.body.sertifikati,
        slika: req.body.slika,
        opis: req.body.opis,
        drzigrupne: req.body.drzigrupne

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

};

//obrisi trenera
export const obrisiTrenera = async (req, res) => {

  try {

    const trener=await Trener.findById(req.params.idTrenera)
    //res.status(200).json(korisnik)
      await RegistrovaniKorisnik.findOneAndDelete({_id:trener.registrovaniKorisnikId})
      await Trener.findOneAndDelete({_id:trener._id})
      res.status(200).json("Account has been deleted");
    

  }
  catch (err) {
    res.status(500).json(err);
  }
};

export default router;