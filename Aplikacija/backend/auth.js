import express from "express";
const router = express.Router();
import jwt from 'jsonwebtoken';
import RegistrovaniKorisnik from "../backend/models/RegistrovaniKorisnik.js";

//Lista validnih refresh tokena (cuva se na serverskoj strani, zbog sigurnosti):
//Ukoliko neko ukrade token, nakon isteka vremena nece moci nista da uradi bez refresh token-a!
//Opet, moze i on da se ukrade ali je dosta vece cimanje za isto!
let refreshTokens = [];

//Metoda za generisanje tokena:
export const generateAccessToken = (user) => {
    //Generise se na osnovu id-ja:
    //console.log(user._id)
    return jwt.sign({ id: user }, process.env.TOKEN_KEY, { expiresIn: "30s" });

};

//Metoda za generisanje refresh tokena:
export const generateRefreshToken = (user) => {
    const token = jwt.sign({ id: user }, process.env.REFRESH_KEY);
    refreshTokens.push(token);

    console.log(refreshTokens)
    console.log(token)

    return token;
};

//Za proveru, neophodno je da korisnik negde na svom racunaru cuva svoj token, i da prilikom nekih interakcija
//zajedno sa podacima neophodnim za obradu operacije posalje i svoj token u header-u:
export const auth = (req, res, next) => {
    try {
        //Vadimo token iz header-a zahteva:
        if (req.headers.authorization) {
            console.log(req.headers.authorization)
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                console.log(token)
                //Proveravamo da li je token ispravan:
                jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
                    if (err) {

                        return res.status(403).json("Token is not valid!");
                    }
                    //Token je validan, vrati korisnika koji je poslao token kroz body:

                    // if (user.id == req.params.id) {

                    req.user = user;

                    console.log('valid')
                    //Sve je u redu, autorizacija je uspesna, moze da se odradi zahtevana operacija:
                    return next();
                    // }
                    // else {
                    //     return res.status(403).json('Nije tvoj token');

                    // }
                });
            }
            else {
                //Za slucaj da nema tokena:
                return res.status(401).json('You are not authorized!');
            }
        }
        else {
            res.status(402).json("Auth token is missing!");
        }
    } catch (err) {
        console.log(err);
    }
};

//Zovemo nakon svake interakcije sa nekim delom sajta
//FIXME: Ukloni nakon prepravljanja:
export const refreshAuth = async (req, res) => {
    try {

        
        //Uzimamo refresh token i proveravamo da li je validan?
        const refreshToken = await  req.body.refreshToken;

        console.log(req.body)

        console.log('ref token ' + refreshToken)

        //Ako nema refresh token-a?
        if (!refreshToken)
            return res.status(401).json("You are not authenticated!");

        // console.log(refreshTokens)
        // console.log(refreshToken)
        //Da li je refresh token validan?
        if (!refreshTokens.includes(refreshToken))
            return res.status(402).json("Refresh token is not valid!");


        console.log('valid')

        //Inace postoji refresh token u nasoj listi koji je validan, samo trebamo da refresh-ujemo tokene:
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
            //Ako je doslo do greske, ne radimo nista!
            if (err)
                console.log(err);
            //U nizu ostaju samo tokeni koji su razliciti od trenutno upotrebljenog
            //  refreshTokens = refreshTokens.filter(token => token !== refreshToken);

            //Pravimo novi i token i refresh token i saljemo ih korisniku na cuvanje:

            const newAccessToken = generateAccessToken(user.id);
            // const newRefreshToken = generateRefreshToken(user.id);

            //Dodajemo refresh token u listu koja se cuva na serveru:
            // refreshTokens.push(newRefreshToken); // ne mora da se doda jer ga doda fja generateRefreshToken(user.id);

            // console.log(refreshToken)
            //  console.log(newRefreshToken)

            //Sve okej, vracamo tokene nazad:
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: refreshToken
            });
        });
    } catch (err) {
        console.log(err);
    }
};

export const upravaMethod = async (req, res, next) => {
    try {
        //Pre ovoga je svakako bio auth, koji u req.user postavlja id korisnika koji je pozvao metodu
        const users = await RegistrovaniKorisnik.findById(req.user.id);

        if (users.tipKorisnika != "Uprava")
            return res.status(403).json("Samo uprava moze da pristupi!");
        else
            return next();
        //Prelazi na obradjivanje same metode, sto znaci da je uprava i da ne treba da u metodi
        //proveravas, pozvace se samo ako se izvrsi ova provera!

    } catch (err) {
        //console.log("Poruka nastala u auth", err);
        return res.status(500).json(err.Message);
    }
}

export const trenerMethod = async (req, res, next) => {
    try {
        //Pre ovoga je svakako bio auth, koji u req.user postavlja id korisnika koji je pozvao metodu
        const users = await RegistrovaniKorisnik.findById(req.user.id);

        if (users.tipKorisnika != "Trener")
            return res.status(403).json("Samo trener moze da pristupi!");
        else
            return next();
        //Prelazi na obradjivanje same metode, sto znaci da je uprava i da ne treba da u metodi
        //proveravas, pozvace se samo ako se izvrsi ova provera!

    } catch (err) {
        //console.log("Poruka nastala u auth", err);
        return res.status(500).json(err.Message);
    }
}

export default router;