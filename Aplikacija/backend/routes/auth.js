const router = require("express").Router();
const bcrypt = require("bcrypt");
const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik");
const Uprava = require("../models/Uprava")
const Trener = require("../models/Trener")
const Korisnik = require("../models/Korisnik");


router.post("/register", async (req, res) => {
  try {

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
      tip: tipKorisnika
    });

    const user = await novi.save();

    if (tipKorisnika == "Korisnik") {
      const noviKorisnik = await new Korisnik({
        registrovaniKorisnikId: user._id,
        verifikovan: false
      })

      const noviKor = await noviKorisnik.save();
      res.status(200).json(noviKor)
      return

    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});


router.post("/login", async (req, res) => {
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
          zeljeniProcenatProteina: korisnik.zeljeniProcenatProteina,
          zeljenaTezinaMisica: korisnik.zeljenaTezinaMisica,
          zeljeniProcenatMasti: korisnik.zeljeniProcenatMasti,
          zeljenaTezina: korisnik.zeljenaTezina
        }
        res.status(200).json(novi)
      }
      else {
        res.status(404).json("Nema korisnika");
      }
    }
    else if (user.tipKorisnika == "Uprava") {
      const uprava = await Uprava.findOne({ registrovaniKorisnikId: user._id });
      if (uprava != null) {
        let novi = {
          id: user.id,
          ime: user.ime,
          prezime: user.prezime,
          email: user.emil,
          brojTelefona: user.brojTelefona,
          password: user.password,
          tip: user.tipKorisnika,
          upravaId: uprava._id
        }
        res.status(200).json(novi)
      }
      else {
        res.status(404).json("Nema uprave");
      }
    }
    else {
      const trener = await Uprava.findOne({ registrovaniKorisnikId: user._id });
      if (trener != null) {
        let novi = {
          id: user.id,
          ime: user.ime,
          prezime: user.prezime,
          email: user.emil,
          brojTelefona: user.brojTelefona,
          password: user.password,
          tip: user.tipKorisnika,
          trenerId: trener._id
        }
        res.status(200).json(novi)
      }
      else {
        res.status(404).json("Nema trenera");
      }
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post("/proveriSifru", async (req, res) => {
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
});

module.exports = router;