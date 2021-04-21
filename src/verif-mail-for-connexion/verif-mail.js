let User = require('../repository/User.js');
let bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    let entityMail = req.body.email;
    let entityPassword = req.body.mdp;
    let allData = (new User).recup_all_data();

    allData.then((value) => {

        let VerifMail = value.filter(e => e.email === entityMail);
        let VerifMdp = bcrypt.compareSync(entityPassword, VerifMail[0].mdp);

        console.log('verif du mail : ' , VerifMail);

        if(VerifMail.length !== 0 && VerifMdp ){
            req.session.user = VerifMail
            // console.log("req.session", req.session);
            req.flash('notify', `Bonjour ${VerifMail[0].nom} vous êtes connecter !!!`);
            res.redirect(`/`);
            // res.redirect(`/Connexion/${VerifMail[0]._id}`);
        }else{
            req.flash('error', 'votre adresse mail ou votre mot de passe est incorect, veuillez recommencer !!!');
            res.redirect('/Connexion');
        }
        next();
    })
};