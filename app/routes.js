let Home = require('../src/controllers/Home.js');
let Inscription = require('../src/controllers/Inscription.js');
let Connexion = require('../src/controllers/Connexion.js');
let Realty = require('../src/controllers/Realty.js');
let VerifierToutLesChamps = require('../src/form-valid/Inscription-controle-champs.js');
let RecupDesBiens = require('../src/recup_des_biens/recup_des_biens.js');
let RecupDesUsers = require('../src/recup_des_users/recup_des_users.js');
let RecupIDupdate = require('../src/middleware-update/middlewareUpdate.js');
let RecupIDupdateUser = require('../src/middleware-update/middlewareUpdateUser.js');
let expressFillUpload =  require('express-fileupload')({createParentPath: true});
let LcParserService = require('../src/services/LcParserService.js');
let errorsHTTP = require('../app/errorsHTTP.js')();
let TokenCRF = require('../src/middleware-CRF/crf-token.js');
// let MiddlewareJWT = require('../src/middleware-JWT/middleware-JWT.js');
// const middlewareJWT = require('../src/middleware-JWT/middleware-JWT.js');


module.exports = (app) => {

    app.route("/").get(RecupDesBiens, (new Home()).print).all(errorsHTTP.error405);

    app.route("/UnBien/:slug")
        .get(RecupIDupdate, (new Home()).printBienUnParUn)
        .all(errorsHTTP.error405);

    app.route("/Inscription").get(TokenCRF.generate, (new Inscription()).print).all(errorsHTTP.error405);
    
    app.route("/Connexion")
        .get((new Connexion()).print)
        .post((new Connexion()).connexion_with_mail_and_password)
        .all(errorsHTTP.error405);

    app.route("/admin").get((new Realty()).printAdministration).all(errorsHTTP.error405);
    // app.get('/admin', (req, res) => { 
    //     res.send(`Acces autorisé`);
    // });
    

    app.route("/admin/realty/add")
        .get((new Realty()).printRegister)
        .post(expressFillUpload, (new Realty()).insertion_bien)
        .all(errorsHTTP.error405);
    
    app.route("/admin/realty/addCollab")
        .get((new Inscription()).print)
        .all(errorsHTTP.error405);

    
    app.route('/admin/realty/update/:slug')
        .get(RecupIDupdate, (new Realty()).printRegister)
        .post(expressFillUpload, (new Realty()).update_Un_bien)
        .all(errorsHTTP.error405);

    app.route('/admin/realty/update-user/:slug')
        .get(RecupIDupdateUser, (new Inscription()).print)
        .post(expressFillUpload, (new Inscription()).update_un_user)
        .all(errorsHTTP.error405);


    app.route("/admin/realty/liste-des-biens")
        .get(RecupDesBiens, (new Realty()).printListeBien)
        .all(errorsHTTP.error405);

    app.route("/admin/realty/liste-des-collaborateurs")
        .get(RecupDesUsers, (new Inscription()).printListeUser)
        .all(errorsHTTP.error405);

    app.route("/admin/realty/delete/:slug")
        .get((new Realty()).delete_Un_bien)
        .all(errorsHTTP.error405);

    app.route("/admin/realty/delete-user/:slug")
        .get((new Inscription()).delete_Un_user)
        .all(errorsHTTP.error405);

    app.route("/logout/deconnexion-user")
    .get((new Inscription()).deconnexion_user)
    .all(errorsHTTP.error405);
    

    app.route("/admin/contacts")
    .get((new Realty()).printAdministration)
    .all(errorsHTTP.error405);
    

    app.route("/insertion_dans_base")
    .post(TokenCRF.verify, VerifierToutLesChamps, (new Inscription()).insert_form)
    .all(errorsHTTP.error405);

    // Erreur 404
    app.route("*").all(errorsHTTP.error404);
};
