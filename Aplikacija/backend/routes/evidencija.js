const router = require("express").Router();
const Blog = require("../models/Blog")

//vrati sve blogove
router.get("/vratiBlogove", async (req, res) => {

    try {
       
    }
    catch (err) {
        res.status(500).json(err);
    }
})



//Metoda za vracanje bloga sa datim tagom:
router.get("/vratiBlogTag/:tag", async (req, res) => {

    try {
        

    }
    catch (err) {
        return res.status(500).json(err);
    }
})

//dodajBlog
router.post("/dodajBlog", async (req, res) => {

    try {
       

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//izmeniBlog
router.put("/izmeniBlog/:idBloga", async (req, res) => {
    try {
       

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