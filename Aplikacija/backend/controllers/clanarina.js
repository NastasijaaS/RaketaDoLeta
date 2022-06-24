import express from "express";
const router = express.Router();
import Clanarina from "../models/Clanarina.js"
import Korisnik from "../models/Korisnik.js"
import Usluga from "../models/Usluga.js"


//vidi clanarinu
export const vidiClanarinu = async (req, res) => {

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

}

//dodaj clanarinu ili produzi
export const dodajClanarinu = async (req, res) => {
  try {
    const korisnik = await Korisnik.findById(req.params.idKorisnika)

    if (korisnik != null) {

      const usluga = await Usluga.findById(req.params.idUsluge)

      if (usluga === null) {
        res.status(404).json("Usluga nije pronadjena")
        return
      }

      const clanarina = await Clanarina.findById(korisnik.clanarinaId)

      if (clanarina === null) {
        res.status(404).json("Clanarina nije pronadjena")
        return
      }

      const danas = new Date()
      let datumDo = new Date()

      if (clanarina.vaziDo < danas) {
        //ako je manja datum do ce da bude danas+trajanje
        datumDo.setDate(danas.getDate() + usluga.trajanje)
      }
      else {
        // ako nije onda se na prosli datum samo doda trajanje
        datumDo = new Date(clanarina.vaziDo)
        datumDo.setDate(clanarina.vaziDo.getDate() + usluga.trajanje)
      }


      await clanarina.updateOne({
        $set:
        {
          cena: usluga.cena,
          datumUplate: new Date(),
          vaziDo: datumDo,
          uslugaId: usluga._id
        }
      })

      res.status(200).json(clanarina);

    }

    else {
      res.status(404).json("Korisnik nije pronadjen")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }

}

export default router;