let Home = require('../src/controllers/Home.js');
let Inscription = require('../src/controllers/Inscription.js');
let Connexion = require('../src/controllers/Connexion.js');
let FacebookAuthentificate = require('../src/controllers/FacebookAuthentificate.js');
let GoogleAuthentificate = require('../src/controllers/GoogleAuthentificate.js');
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
// let authentificateFacebook = require('../public/js/authentificateFirebase/authentificateFirebaseWithGoogleAndFacebook.js');
// let MiddlewareJWT = require('../src/middleware-JWT/middleware-JWT.js');
// const middlewareJWT = require('../src/middleware-JWT/middleware-JWT.js');


module.exports = (app) => {

/*************************************************************************************************/
/************************ ROUTE RACINE ***********************************************************/
/*************************************************************************************************/

    app.route("/").get(RecupDesBiens, (new Home()).print).all(errorsHTTP.error405);

/*************************************************************************************************/
/************************ LES ROUTES DU MOT DE PASSE OUBLIER *************************************/
/*************************************************************************************************/

    app.route('/mot_de_passe_oublie')
        .get((new Inscription()).printPasswordLost)
        .post(TokenCRF.generateForPassword, (req, res) => (new Inscription()).process_reset_password(req,res,app))
        .all(errorsHTTP.error405);

/************************************************************************************************************/
/************************ LES ROUTES AUTHENTIFICATION FACEBOOK AND GOOGLE ***********************************/
/************************************************************************************************************/

    app.route('/auth-facebook')
        .post((new FacebookAuthentificate()).facebookAuthentificate)
        .all(errorsHTTP.error405);

    app.route('/auth-google')
        .post((new GoogleAuthentificate()).googleAuthentificate)
        .all(errorsHTTP.error405);

/*************************************************************************************************/
/************************ LES ROUTES INSCRIPTION *************************************************/
/*************************************************************************************************/

    app.route("/Inscription").get(TokenCRF.generate, (new Inscription()).print).all(errorsHTTP.error405);

    app.route("/insertion_dans_base")
    .post(TokenCRF.verify, VerifierToutLesChamps, (new Inscription()).insert_form)
    .all(errorsHTTP.error405);

/**********************************************************************************************************/
/************************ PAGES PRINCIPALE LORSQU'ON CLIQUE SUR UN BIEN ***********************************/
/**********************************************************************************************************/

    app.route("/UnBien/:slug")
        .get(RecupIDupdate, (new Home()).printBienUnParUn)
        .all(errorsHTTP.error405);

/**********************************************************************************************************/
/************************ LES ROUTES CONNEXION ************************************************************/
/**********************************************************************************************************/
    
    app.route("/Connexion")
        .get((new Connexion()).print)
        .post((new Connexion()).connexion_with_mail_and_password)
        .all(errorsHTTP.error405);    
    
/*************************************************************************************************/
/************************ LES ROUTES PARTIE ADMIN ************************************************/
/*************************************************************************************************/

    app.route("/admin").get((new Realty()).printAdministration).all(errorsHTTP.error405);

/************** ROUTE AJOUT DUN BIEN *******************/

    app.route("/admin/realty/add")
        .get((new Realty()).printRegister)
        .post(expressFillUpload, (new Realty()).insertion_bien)
        .all(errorsHTTP.error405);

/************** ROUTE AJOUT DUN UTILISATEUR *******************/
    
    app.route("/admin/realty/addCollab")
        .get((new Inscription()).print)
        .all(errorsHTTP.error405);

/************** ROUTE UPDATE UN BIEN *******************/

    app.route('/admin/realty/update/:slug')
        .get(RecupIDupdate, (new Realty()).printRegister)
        .post(expressFillUpload, (new Realty()).update_Un_bien)
        .all(errorsHTTP.error405);

/************** ROUTE UPDATE UN USER *******************/

    app.route('/admin/realty/update-user/:slug')
        .get(RecupIDupdateUser, (new Inscription()).print)
        .post(expressFillUpload, (new Inscription()).update_un_user)
        .all(errorsHTTP.error405);

/************** ROUTE LISTING DES BIENS *******************/

    app.route("/admin/realty/liste-des-biens")
        .get(RecupDesBiens, (new Realty()).printListeBien)
        .all(errorsHTTP.error405);

/************** ROUTE LISTING DES USERS *******************/

    app.route("/admin/realty/liste-des-collaborateurs")
        .get(RecupDesUsers, (new Inscription()).printListeUser)
        .all(errorsHTTP.error405);

/************** ROUTE DELETE UN BIEN *******************/

    app.route("/admin/realty/delete/:slug")
        .get((new Realty()).delete_Un_bien)
        .all(errorsHTTP.error405);

/************** ROUTE DELETE UN USER *******************/

    app.route("/admin/realty/delete-user/:slug")
        .get((new Inscription()).delete_Un_user)
        .all(errorsHTTP.error405);

/************** ROUTE CONTACT PAS ENCORE TRAITER *******************/

    app.route("/admin/contacts")
        .get((new Realty()).printAdministration)
        .all(errorsHTTP.error405);

/****************************************************************************************************/
/************************ ROUTE DECONNEXION SUPPRESSION DU COOKIE ***********************************/
/****************************************************************************************************/

    app.route("/logout/deconnexion-user")
    .get((new Inscription()).deconnexion_user)
    .all(errorsHTTP.error405);

/************************ PARCOUR DE TOUTE LES ROUTES ET GENERATION DUNE ERREUR SI ERREUR405 PAS TROUVER ***********************************/
    // Erreur 404
    app.route("*").all(errorsHTTP.error404);
};
