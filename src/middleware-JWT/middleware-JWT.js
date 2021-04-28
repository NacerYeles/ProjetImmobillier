const Cookies = require( "cookies" );
const jwt = require('jsonwebtoken');
const config = require('../../app/config.js');

module.exports = (req, res, next) => {
        console.log('ok')
        let token = new Cookies(req,res).get('access_token');
        if(typeof token != 'undefined') {
            jwt.verify(token, config.appKey, (err, user) => {
                // console.log(user);
                if(!err) {
                    res.locals.cookieSession = user;
                    req.user = user;
                    // console.log("coucou je suis une des pages admin lalali");
                    next();
                } else {
                    // Le jeton n'était pas correct
                    res.status(403).send('Forbidden');
                }
            });
        } else {
            res.status(403).send('Forbidden');
        }
    }
