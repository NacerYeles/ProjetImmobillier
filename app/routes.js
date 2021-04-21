let Home = require('../src/controllers/Home.js');
let Inscription = require('../src/controllers/Inscription.js');
let Connexion = require('../src/controllers/Connexion.js');
let Realty = require('../src/controllers/Realty.js');
let VerifierToutLesChamps = require('../src/form-valid/Inscription-controle-champs.js');
let RecupDesBiens = require('../src/recup_des_biens/recup_des_biens.js');
let RecupIDupdate = require('../src/middleware-update/middlewareUpdate.js');
let expressFillUpload =  require('express-fileupload')({createParentPath: true});
let LcParserService = require('../src/services/LcParserService.js');

module.exports = (app) => {
    app.get('/', (req, res) => {
        (new Home()).print(req, res);
    });
    app.get('/Inscription', (req, res) => {
        (new Inscription()).print(req, res);
    });
    app.get('/Connexion', (req, res) => {
        (new Connexion()).print(req, res);
    });

    app.route("/admin").get((new Realty()).printAdministration);

    app.route("/admin/realty/add")
        .get((new Realty()).printRegister)
        .post(expressFillUpload, (new Realty()).insertion_bien);
    
    app.route('/admin/realty/update/:slug')
        .get(RecupIDupdate, (new Realty()).printRegister)
        .post(expressFillUpload, (new Realty()).update_Un_bien);

    app.get('/admin/realty/liste-des-biens', RecupDesBiens, (req, res) => { 
        (new Realty()).printListeBien(req, res);
    });
    app.get('/admin/realty/delete/:slug', (req, res) => { 
        (new Realty()).delete_Un_bien(req, res);
    });
    app.get('/logout/deconnexion-user', (req, res) => {
        (new Inscription()).deconnexion_user(req, res);
    });
    
    app.get('/admin/contacts', (req, res) => {
        (new Realty()).printAdministration(req, res);
    });
    app.post('/connexion_with_mail_and_password', (req, res) => {
        (new Connexion()).connexion_with_mail_and_password(req, res);
    });
    app.post('/insertion_dans_base', VerifierToutLesChamps, (req, res) => {
        (new Inscription()).insert_form(req, res);
    })

};
