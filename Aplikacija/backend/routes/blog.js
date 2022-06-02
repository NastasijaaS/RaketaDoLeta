const router = require("express").Router();
const Blog = require("../models/Blog")

//vrati sve blogove
router.get("/vratiBlogove", async (req, res) => {

    try {
        const blogovi = await Blog.find()
        if (blogovi.length != 0) {
            res.status(200).json(blogovi)
        }
        else {
            res.status(400).json("Nema  za prikaz")
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})



//Metoda za vracanje bloga sa datim tagom:
router.get("/vratiBlogTag/:tag", async (req, res) => {

    try {
        const firstArray = await Blog.find({ tagovi: req.params.tag});
        if (firstArray.length === 0)
            return res.status(404).json("Ne postoji blog sa zadatim tagom");
        else
            return res.status(200).json(firstArray);

    }
    catch (err) {
        return res.status(500).json(err);
    }
})

//dodajBlog
router.post("/dodajBlog", async (req, res) => {

    try {
        const datum=new Date();
        const blog = await new Blog({
            naslov: req.body.naslov,
            datum: datum,
            tekst: req.body.tekst,
            tagovi: req.body.tagovi,
            slika:req.body.slika
        })

        const blogSave = await blog.save()
        res.status(200).json(blogSave)

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//izmeniBlog
router.put("/izmeniBlog/:idBloga", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.idBloga)
        if (blog != null) {
            await blog.updateOne({ $set: req.body })
            res.status(200).json(blog);
        }
        else {
            res.status(404).json("Blog nije pronadjen")
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
})

//obrisiBlog
router.delete("/obrisiBlog/:idBloga", async (req, res) => {
    try {
        await Blog.findOneAndDelete(req.params.idBloga)
        res.status(200).json("Blog je uspesno obrisan")

    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router