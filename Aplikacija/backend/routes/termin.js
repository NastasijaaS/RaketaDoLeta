const router = require("express").Router();
const Termin = require("../models/Termin");
const Trener = require("../models/Trener");


//vrati termine za trenera
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
                slobodan:false
        }})
        res.status(200).json(zakazan)

        // const zakazanSave=zakazan.save()
        // res.status(200).json(zakazanSave)

    }
    catch (err) {
        res.status(500).json(err);
    }
})

//obrisiBlog
router.delete("/obrisiTermin/:idTermina", async (req, res) => {
    try {
        await Termin.findByIdAndDelete(req.params.idTermina)
        res.status(200).json("Uspesno obrisan termin")
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router