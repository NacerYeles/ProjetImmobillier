const jwt = require('jsonwebtoken');
const Cookies = require( "cookies" );
const config = require('../../app/config.js');

module.exports = class FacebookAuthentificate {
    print(request, response) {
        response.render('home');
    }
    facebookAuthentificate(request, response, next) {
        let accessToken = jwt.sign(
            {
                email: request.body.email,
                civilite: '',
                nom: request.body.displayName, 
                prenom: '',
                telephone: request.body.phoneNumber,
                photoURL: request.body.photoURL,
                slug: request.body.uid,
                permissions: ['pas-admin']
            },
            config.appKey,
            {expiresIn: 604800}
        );       
        new Cookies(request,response).set('access_token', accessToken, {httpOnly: true, secure: false });
        response.send('OK');
    }
};
