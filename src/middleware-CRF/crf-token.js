let AES = require("crypto-js/aes");
let SHA256 = require("crypto-js/sha256");
let errorsHTTP = require('../../app/errorsHTTP.js')();

exports.generate = (req, res, next) => {
    let tokenCRF = SHA256(`${new Date().toDateString()}${Math.random()}`).toString()
    res.locals.csrf = tokenCRF
    req.session.csrf = tokenCRF
    next()
};

exports.verify = (req, res, next) => {
    if(req.body.csrf !== req.session.csrf){
        errorsHTTP.error409(req, res);
    } else {
        next();
    }
};