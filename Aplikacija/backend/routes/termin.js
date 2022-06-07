const router = require("express").Router();
const Termin = require("../models/Termin");
const Trener = require("../models/Trener");


router.get("/vratiBlogove", async (req, res) => {

    try {
        
    }
    catch (err) {
        res.status(500).json(err);
    }
})



//Metoda za vracanje bloga sa datim tagom:
router.get("/vratiTermineZaTrenera/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if(trener!=null){
            const sviTermini=await Termin.find({trenerId:trener._id})
           res.status(200).json(sviTermini);
        }
        else{
            res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
})

//dodajBlog
router.post("/dodajTerminTreneru/:idTrenera", async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if(trener!=null){
            const t = await new Termin({
                trenerId:trener._id,
                datum:req.body.datum,
                vremePocetka:req.body.vremePocetka,
                vremeKraja:req.body.vremeKraja,
                slobodan:true
            })

            const terminSave= await t.save()
            res.status(200).json(terminSave)
        }
        else{
            res.status(404).json("trener nije pronadjen")
        }
        

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//izmeniBlog
router.put("/zakaziTermin/:idTermina", async (req, res) => {
    try {
        const zakazan = await Termin.findByIdAndUpdate(req.params.idTermina, {$set:{
            datum:req.body.datum,
                vremePocetka:req.body.vremePocetka,
                vremeKraja:req.body.vremeKraja,
                slobodan:false
        }})

    }
    catch (err) {
        res.status(500).json(err);
    }
})

//obrisiBlog
router.delete("/obrisiBlog/:idBloga", async (req, res) => {
    try {
        

    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router