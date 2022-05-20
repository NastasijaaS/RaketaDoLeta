const router = require("express").Router();
const bcrypt = require("bcrypt");
const { findById } = require("../models/RegistrovaniKorisnik");

const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik")


//update your account
router.put("/:id", async (req, res) => {

  if (req.body.registrovaniKorisnikId == req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await RegistrovaniKorisnik.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  else {
    res.status(403).json("You can update only your account");
  }
});

//obrisi svoj nalog

module.exports = router