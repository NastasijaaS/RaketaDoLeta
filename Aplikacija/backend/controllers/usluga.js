import express from "express";
const router = express.Router();
import Usluga from "../models/Usluga.js"



//pregledaj sve usluge
export const  vidiUsluge = async (req, res) => {

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

} 

//dodaj uslugu
export const dodajUslugu = async (req, res) => {

  try {

    const usluga = await new Usluga({
      cena: req.body.cena,
      opis: req.body.opis,
      naziv: req.body.naziv,
      trajanje: req.body.trajanje,
      treningGrupni:req.body.treningGrupni,
      slika:req.body.slika
    })

    const uslugaSave = await usluga.save()
    res.status(200).json(uslugaSave)

  }
  catch (err) {
    res.status(500).json(err);
  }

}

//izmeni uslugu
export const  izmeniUslugu = async (req, res) => {

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
}

//obrisi uslugu
export const obrisiUslugu = async (req, res) => {

  try {

    await Usluga.findByIdAndDelete(req.params.idUsluge)
    res.status(200).json("Usluga je uspesno obrisana")

  }
  catch (err) {
    res.status(500).json(err);
  }
};

export default router;

