const router = require("express").Router();
const bcrypt = require("bcrypt");
const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik");
const Uprava = require("../models/Uprava")
const Trener = require("../models/Trener")
const Korisnik = require("../models/Korisnik");


router.post("/login", async (req, res) => {
  try {
    const user = await RegistrovaniKorisnik.findOne({ email: req.body.email });

    if (!user)
      res.status(404).json("Nema takvog korisnika");

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword)
      res.status(400).json("Pogresna lozinka")

    if (user.tipKorisnika == "Korisnik") {
      const korisnik = await Korisnik.findOne({ registrovaniKorisnikId: user._id });
      if (korisnik != null) {
        let novi = {
          ime: user.ime,
          prezime: user.prezime,
          email: user.emil,
          brojTelefona: user.brojTelefona,
          password: user.password,
          tip: user.tipKorisnika,
          korisnikId: korisnik._id
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



module.exports = router;