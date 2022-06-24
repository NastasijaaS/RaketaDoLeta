import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import  RegistrovaniKorisnik  from "../models/RegistrovaniKorisnik.js";
import  Uprava from "../models/Uprava.js"
import  Trener from "../models/Trener.js"
import  Korisnik from "../models/Korisnik.js";
//import  Evidencija from "../models/Evidencija.js";
import  { generateAccessToken} from "../auth.js";

//import Category from "../Models/Category.js";


export const register = async (req, res) => {
  try {

    //console.log(req.body)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    

    let tipKorisnika = "Korisnik";
    if (req.body.tipKorisnika === 'Uprava') {
      tipKorisnika = 'Uprava'
    }
    else if (req.body.tipKorisnika === 'Trener') {
      tipKorisnika = 'Trener'
    }
    

    const novi = await new RegistrovaniKorisnik({
      ime: req.body.ime,
      prezime: req.body.prezime,
      brojTelefona: req.body.brojTelefona,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      tipKorisnika: tipKorisnika
    });

    const user = await novi.save();

    if (tipKorisnika == "Korisnik") {
      const noviKorisnik = await new Korisnik({
        registrovaniKorisnikId: user._id,
        verifikovan: false,
        visina: 0,
        zeljenaTezina: 0,
        zeljenaTezinaMisica: 0,
        zeljeniProcenatMasti: 0,
        zeljeniProcenatProteina: 0,
        brojGodina: 0
      })

      const noviKor = await noviKorisnik.save();

      //const token = generateAccessToken(noviKor)
      //console.log(token)
    

      let novi = {
        id: user.id,
        ime: user.ime,
        prezime: user.prezime,
        email: user.email,
        brojTelefona: user.brojTelefona,
        password: user.password,
        tip: user.tipKorisnika,
        korisnikId: noviKor._id,
        visina: noviKor.visina,
        brojGodina: noviKor.brojGodina,
        zeljeniProcenatProteina: noviKor.zeljeniProcenatProteina,
        zeljenaTezinaMisica: noviKor.zeljenaTezinaMisica,
        zeljeniProcenatMasti: noviKor.zeljeniProcenatMasti,
        zeljenaTezina: noviKor.zeljenaTezina,
        verifikovan:noviKor.verifikovan,
        token:token
      }

      return res.status(200).json(novi)

    }
    else
      return res.status(200).json(user);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
};


export const login = async (req, res) => {
  try {
    const user = await RegistrovaniKorisnik.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json("Nema takvog korisnika");
      return
    }


    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      res.status(400).json("Pogresna lozinka")
      return
    }

    if (user.tipKorisnika == "Korisnik") {
      const korisnik = await Korisnik.findOne({ registrovaniKorisnikId: user._id });
      const token = generateAccessToken(korisnik)
      

      if (korisnik != null) {
        let novi = {
          id: user.id,
          ime: user.ime,
          prezime: user.prezime,
          email: user.email,
          brojTelefona: user.brojTelefona,
          password: user.password,
          tip: user.tipKorisnika,
          korisnikId: korisnik._id,
          brojGodina: korisnik.brojGodina,
          visina: korisnik.visina,
          verifikovan:korisnik.verifikovan,
          zeljeniProcenatProteina: korisnik.zeljeniProcenatProteina,
          zeljenaTezinaMisica: korisnik.zeljenaTezinaMisica,
          zeljeniProcenatMasti: korisnik.zeljeniProcenatMasti,
          zeljenaTezina: korisnik.zeljenaTezina,
          token:token
        }
        return res.status(200).json(novi)
      }
      else {
        return res.status(404).json("Nema korisnika");
      }
    }
    else if (user.tipKorisnika == "Uprava") {
      const uprava = await Uprava.findOne({ registrovaniKorisnikId: user._id });

      if (uprava != null) {
        const token = generateAccessToken(uprava)

        let novi = {
          id: user.id,
          ime: user.ime,
          prezime: user.prezime,
          email: user.email,
          brojTelefona: user.brojTelefona,
          password: user.password,
          tip: user.tipKorisnika,
          upravaId: uprava._id,
          token:token
        }
        return res.status(200).json(novi)
      }
      else {
        return res.status(404).json("Nema uprave");
      }
    }
    else {
      const trener = await Trener.findOne({ registrovaniKorisnikId: user._id });

      if (trener != null) {
        const token = generateAccessToken(trener)

        let novi = {
          id: user.id,
          ime: user.ime,
          prezime: user.prezime,
          email: user.email,
          brojTelefona: user.brojTelefona,
          //password: user.password,
          tip: user.tipKorisnika,
          trenerId: trener._id,
          sertifikati:trener.sertifikati,
          iskustvo:trener.iskustvo,
          token:token
        }
        return res.status(200).json(novi)
      }
      else {
       return res.status(404).json("Nema trenera");
      }
    }
  }
  catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
};

export const  proveriSifru = async (req, res) => {
  try {
    const user = await RegistrovaniKorisnik.findOne({ _id: req.body.id });

    if (!user)
      res.status(404).json("Nema takvog korisnika");

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword)
      res.status(400).json("Pogresna lozinka")
    else {
      res.status(200).json("Dobra sifra")
    }

  }
  catch (err) {
    res.status(500).json(err)
  }
};

export const proveriEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const mailNovi=await RegistrovaniKorisnik.findOne({email:email})

    if (mailNovi!=null)
      res.status(404).json("Vec postoji korisnik sa zadati mailom");

    else {
      res.status(200).json("Dobar mail")
    }

  }
  catch (err) {
    res.status(500).json(err)
  }
};

export default router;