const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
let MiddlewareJWT = require('./src/middleware-JWT/middleware-JWT.js');
const guard = require('express-jwt-permissions')();
const Cookies = require( "cookies" );
const jwt = require('jsonwebtoken');

//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: config.appKey, resave: false, saveUninitialized: false, 
    cookie: {maxAge: 3600000} 
}));

//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

//--------------------------------------------------------------------
//      Mise en place du Body Parser
//--------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    indentedSyntax: true, // true = .sass and false = .scss
    outputStyle: 'compressed',
    sourceMap : true
}));

//--------------------------------------------------------------------
//     Traitement du jeton jwt
//--------------------------------------------------------------------

app.use('/admin', MiddlewareJWT, guard.check('admin'));

//app.use(MiddlewareJWT);

app.use( (err, req, res, next) => {
    if (err.code === 'permission_denied') {
      //res.status(403).send('Forbidden');
      req.flash('error', 'Vous êtes pas autoriser à accéder aux fonctionnalités de la partie admin ');
      res.redirect('/');
    }
});

//--------------------------------------------------------------------
//      envoie de variable dans toute les vue
//--------------------------------------------------------------------

app.use((req,res, next) => {
    res.locals.session = req.session;
    res.locals.route = req._parsedUrl.pathname;
    res.locals.nomDesBiens = {
        1: "Maison",
        2: "Appartement",
        3: "Terrain",
        4: "Parking",
        5: "Local / Bureau",
        6: "Autres"
    }

    // console.log('req.session : ', req.session);
    res.locals.cookieSession = {};
    let token = new Cookies(req,res).get('access_token');
    if(typeof token != 'undefined') {
        jwt.verify(token, config.appKey, (err, user) => {
            // console.log('LLLLLLLLLLLLEEEEEEEEEEEEE UUUUUUUUUUUSSSSSSSSEEEERRRRRR : ', user);
            if(!err) {
                res.locals.cookieSession = user;
            }
        });
    }


    // if(req.session.route !== undefined){
    //     console.log("la route en question : ", req.session.toutLesBiens);
    // }
    next();
})

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port,() => {
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
    if (process.send) {
        process.send('online');
    }
});
