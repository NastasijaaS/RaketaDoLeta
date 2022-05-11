const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
//const multer = require("multer");
const authRoute = require("./routes/auth");
const registrovaniKorisnikRoute=require("./routes/registrovaniKorisnik");
const trenerRoute=require("./routes/trener");
const korisnikRoute=require("./routes/korisnik");
const upravaRoute=require("./routes/uprava");
const treningRoute=require("./routes/trening");
//const napredakRoute=require("./routes/napredak");



dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
); 

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/registrovaniKorisnik", registrovaniKorisnikRoute);
app.use("/api/trener", trenerRoute);
app.use("/api/korisnik", korisnikRoute);
app.use("/api/uprava", upravaRoute);
app.use("/api/trening", treningRoute);
//app.use("/api/napredak", napredakRoute);





app.listen(8800, () => {
    console.log("Backend server is running!");
  });