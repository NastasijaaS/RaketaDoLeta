import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import  RegistrovaniKorisnik  from "../models/RegistrovaniKorisnik.js";
import  Uprava from "../models/Uprava.js"
import  Trener from "../models/Trener.js"
import  Korisnik from "../models/Korisnik.js";
//import  Evidencija from "../models/Evidencija.js";
import  { generateAccessToken} from "../auth.js";
import  { generateRefreshToken} from "../auth.js";





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
      const refreshToken=generateRefreshToken(korisnik)
      

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
          token:token,
          refreshToken:refreshToken
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
        const refreshToken=generateRefreshToken(uprava)

        let novi = {
          id: user.id,
          ime: user.ime,
          prezime: user.prezime,
          email: user.email,
          brojTelefona: user.brojTelefona,
          password: user.password,
          tip: user.tipKorisnika,
          upravaId: uprava._id,
          token:token,
          refreshToken:refreshToken
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
        const refreshToken=generateRefreshToken(trener)

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
          token:token,
          refreshToken:refreshToken
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
      return res.status(404).json("Nema takvog korisnika");

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword)
      return res.status(400).json("Pogresna lozinka")
    else {
      return res.status(200).json("Dobra sifra")
    }

  }
  catch (err) {
    return res.status(500).json(err)
  }
};

export const proveriEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const mailNovi=await RegistrovaniKorisnik.findOne({email:email})

    if (mailNovi!=null)
      return res.status(404).json("Vec postoji korisnik sa zadati mailom");

    else {
      return res.status(200).json("Dobar mail")
    }

  }
  catch (err) {
    return res.status(500).json(err)
  }
};

export const refresh = async (req, res) => {
  try {

    return

  }
  catch (err) {
    return res.status(500).json(err)
  }
};

export const vratiKorisnikaPrekoTokena = (req, res) => {
  try {
      //Vadimo token iz header-a zahteva:
      if (req.headers.authorization) {
          //console.log(req.headers.authorization)
          const token = req.headers.authorization.split(" ")[1];
          if (token) {
           //   console.log(token)
              //Proveravamo da li je token ispravan:
              jwt.verify(token, process.env.TOKEN_KEY,async (err, user) => {
                  if (err) {
                      return res.status(403).json("Token is not valid!");
                  }

                  

                  const korisnik1 = await RegistrovaniKorisnik.findById(user.id);
                  if (!korisnik1) {
                    res.status(404).json("Nema takvog korisnika");
                    return
                  }
                  if (korisnik1.tipKorisnika == "Korisnik") {
                    const korisnik = await Korisnik.findOne({ registrovaniKorisnikId: korisnik1._id });

                    
              
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
                        token:token,
                        //refreshToken:refreshToken
                      }
                      return res.status(200).json(novi)
                    }
                    else {
                      return res.status(404).json("Nema korisnika");
                    }
                  }
                  else if (korisnik1.tipKorisnika == "Uprava") {
                    const uprava = await Uprava.findOne({ registrovaniKorisnikId: korisnik1._id });
              
                    if (uprava != null) {

              
                      let novi = {
                        id: user.id,
                        ime: user.ime,
                        prezime: user.prezime,
                        email: user.email,
                        brojTelefona: user.brojTelefona,
                        password: user.password,
                        tip: user.tipKorisnika,
                        upravaId: uprava._id,
                        token:token,
                        //refreshToken:refreshToken
                      }
                      return res.status(200).json(novi)
                    }
                    else {
                      return res.status(404).json("Nema uprave");
                    }
                  }
                  else {
                    const trener = await Trener.findOne({ registrovaniKorisnikId: korisnik1._id });
              
                    if (trener != null) {

              
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
                        token:token,
                        //refreshToken:refreshToken
                      }
                      return res.status(200).json(novi)
                    }
                    else {
                     return res.status(404).json("Nema trenera");
                    }
                  }


  

              });
          }
          else {
              //Za slucaj da nema tokena:
              return res.status(401).json('You are not authorized!');
          }
      }
      else {
          res.status(403).json("Auth token is missing!");
      }
  } catch (err) {
      console.log(err);
  }
};



export default router;