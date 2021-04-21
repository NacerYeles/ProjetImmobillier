let User = require('../repository/User.js');
let bcrypt = require('bcryptjs');

module.exports = class Connexion {
    print(request, response) {
        response.render('connexion');
    }
    connexion_with_mail_and_password(req, res){
        let entityMail = req.body.email;
        let entityPassword = req.body.mdp;
        console.log(req.body);
        //let allData = (new User).recup_all_data();
        //console.log("entityPassword", req.body);
        if(entityMail === '' || entityPassword === ''){
             // Email incorrect
             req.flash('error', 'votre adresse mail ou votre mot de passe à pas été saisi, veuillez recommencer !!!');
             res.redirect('/Connexion');
        }else{
            (new User).get_user_by_email(entityMail).then((user) => {
                // console.log("user ANAccccNNANANANA : ", user);
                    if(user === null) {
                        // Email incorrect
                        req.flash('error', 'votre adresse mail ou votre mot de passe est incorect, veuillez recommencer !!!');
                        res.redirect('/Connexion');
                    } else {
                        //let VerifMail = value.filter(e => e.email === entityMail);
                        let VerifMdp = bcrypt.compareSync(entityPassword, user.mdp);
        
                        if(VerifMdp){
                            req.session.user = user
                            // console.log('req.session ', req.session);
                            req.flash('notify', `Bonjour ${user.nom} vous êtes connecter !!!`);
                            res.redirect(`/`);
                        }else{
                            req.flash('error', 'votre adresse mail ou votre mot de passe est incorect, veuillez recommencer !!!');
                            res.redirect('/Connexion');
                        }
                    }
                })
        }

            // next();
        }
};
