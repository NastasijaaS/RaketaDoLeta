const router = require("express").Router();
const Zahtev = require("../models/Zahtev")



//obrisi zahtev
router.delete("/obrisiZahtev/:idZahteva", async (req, res) => {
    try {
        await Zahtev.findOneAndDelete(req.params.idZahteva)
        res.status(200).json("Zahtev je uspesno obrisan")

    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router