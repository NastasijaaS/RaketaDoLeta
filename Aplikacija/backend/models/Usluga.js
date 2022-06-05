const mongoose = require("mongoose");

const UslugaSchema = new mongoose.Schema({

    cena: {
        type: Number

    },
    opis: {
        type: String

    },
    naziv: {
        type: String
    },
    trajanje: {
        type: Number
    }

},
    { timestamps: true }
)

module.exports = mongoose.model("Usluga", UslugaSchema);