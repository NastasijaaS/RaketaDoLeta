const router = require("express").Router();
const bcrypt = require("bcrypt");
const RegistrovaniKorisnik = require("../models/RegistrovaniKorisnik");
const Korisnik = require("../models/Korisnik");
const Uprava = require("../models/Uprava");
const Trener = require("../models/Trener");



// //REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     //generate new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     //create new user
//     const newUser = new RegistrovaniKorisnik({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//       tipKorisnika: req.body.tipKorisnika
//     });

//     //save user and respond
//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err)
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const user = await RegistrovaniKorisnik.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")
     //res.status(200).json(user.tipKorisnika);

    if (user.tipKorisnika=="Korisnik"){
      const korisnik= await Korisnik.findOne({registrovaniKorisnikId: user._id});
      if(korisnik!=null){
        let novi = {
          ime:user.ime,
          prezime:user.prezime,
          korisnikId:korisnik._id
        }
        res.status(200).json(novi)
      }
      else{
        res.status(404).json("Nema korisnika");
      }
    }
    else if(user.tipKorisnika=="Uprava"){
      const uprava= await Uprava.findOne({registrovaniKorisnikId: user._id});
      if(uprava!=null){
        let novi = {
          ime:user.ime,
          prezime:user.prezime,
          upravaId:uprava._id
        }
        res.status(200).json(novi)
      }
      else{
        res.status(404).json("Nema uprave");
      }
    }
    else{
      const trener= await Uprava.findOne({registrovaniKorisnikId: user._id});
      if(trener!=null){
        let novi = {
          ime:user.ime,
          prezime:user.prezime,
          trenerId:trener._id
        }
        res.status(200).json(novi)
      }
      else{
        res.status(404).json("Nema trenera");
      }
    }

    //res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});



module.exports = router;