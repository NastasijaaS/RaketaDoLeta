// const router = require("express").Router();
//import express from "express";
//const router = express.Router();
const jwt = require('jsonwebtoken');

let refreshTokens = [];

//Metoda za generisanje tokena:
 const generateAccessToken = (user) => {
    //Generise se na osnovu id-ja:
    return jwt.sign({id:user._id}, process.env.TOKEN_KEY, {expiresIn: "30m"});
};


 const generateRefreshToken = (user) => {
    const token = jwt.sign({id:user._id}, process.env.REFRESH_KEY);
    refreshTokens.push(token);
    return token;
};


 const auth = (req, res, next) => {
    try {
        
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if(token) {
                
                jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
                    if(err) {
                        return res.status(403).json("Token is not valid!");
                    }
                    
                    req.user = user;
                    
                    return next();
                });
            }
            else {
                
                return res.status(401).json('You are not authorized!');
            }
        }
        else {
            res.status(403).json("No token no party :P");
        }
    } catch(err) {
        console.log(err);
    }
};


const refreshAuth = (req, res) => {
    try {
        
        const refreshToken = req.body.refreshToken;

        
        if(!refreshToken)
            return res.status(401).json("You are not authenticated!");

        
        if(!refreshTokens.includes(refreshToken))
            return res.status(403).json("Refresh token is not valid!");

        
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
            
            if(err)
                console.log(err);

            refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);
    
            refreshTokens.push(newRefreshToken);
    
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });
        });
    } catch (err) {
        console.log(err);
    }
};

