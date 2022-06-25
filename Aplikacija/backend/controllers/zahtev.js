import express from "express";
const router = express.Router();
import Zahtev from "../models/Zahtev.js";
import Trening from "../models/Trening.js";
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"


//obrisi zahtev
export const obrisiZahtev = async (req, res) => {
    try {
        await Zahtev.findByIdAndDelete(req.params.idZahteva)
        return res.status(200).json("Zahtev je uspesno obrisan")

    }
    catch (err) {
        return res.status(500).json(err);
    }
};

export const vidiZahteve = async (req, res) => {

    try {

        const registrovaniKorisnik = await RegistrovaniKorisnik.findById(req.params.idRegKorisnika)
        if (registrovaniKorisnik != null) {

            const zahtev = await Zahtev.find({$and:[{registrovaniKorisnikId:registrovaniKorisnik._id}, {status:req.params.status}]})
            console.log(zahtev)
            if (zahtev != null) {
                return res.status(200).json(zahtev)
            }
            else {
                return res.status(404).json("ne postoji dodat napredak za ovog klijenta")
            }

        }
        else {
           return res.status(404).json("korisnik nije pronadjen")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

export const vidiZahteveZaKorisnika = async (req, res) => {

    try {

        const registrovaniKorisnik = await RegistrovaniKorisnik.findById(req.params.idRegKorisnika)
        //console.log(req.params.idRegKorisnika)
        //console.log(registrovaniKorisnik)
        if (registrovaniKorisnik != null) {

            const zahtev = await Zahtev.find({registrovaniKorisnikId:registrovaniKorisnik._id})

            if (zahtev != null) {
                return res.status(200).json(zahtev)
            }
            else {
                return res.status(404).json("ne postoji dodat napredak za ovog klijenta")
            }

        }
        else {
            return res.status(404).json("korisnik nije pronadjen")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//napravi zahtev za treningom i posalji treneru
export const napraviZahtev =async (req, res) => {

  try {
    const trening = await Trening.findById(req.params.idTreninga)
    if (trening != null) {

      const zahtev = await new Zahtev({
        treningId: req.params.idTreninga
      })

      const zahtevSave = await zahtev.save()
      return res.status(200).json(zahtev)

    }
    else {
      return res.status(404).json("Trening nije pronadjen")
    }


  }
  catch (err) {
    return res.status(500).json(err);
  }

} 

//vrati listu odbijenih  
export const vratiZahteveOdbijeni = async (req, res) => {

  try {
    const zahtev = await Zahtev.find({ status: ("Ukinuto" || "Odbijeno") })
    //res.status(200).json(zahtev)
    if (zahtev.length != 0) {

      let zahtevi = []


      for (let i = 0; i < zahtev.length; i++) {

        const zah = {

          poruka: zahtev[i].poruka

        }

        zahtevi.push(zah)
      }

       return res.status(200).json(zahtevi)
    }

    else {
      return res.status(400).json("Nema zahteva za prikaz")
    }

  }
  catch (err) {
    return res.status(500).json(err);
  }

}

export const napraviZahtevTrener =async (req, res) => {

  try {

      const zahtev = await new Zahtev({
        poruka: req.params.poruka
      })

      const zahtevSave = await zahtev.save()
      return res.status(200).json(zahtev)

    }

  catch (err) {
    return res.status(500).json(err);
  }

} 

export default router;