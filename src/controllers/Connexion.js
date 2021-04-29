let User = require('../repository/User.js');
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cookies = require( "cookies" );
const config = require('../../app/config.js');


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
                            // req.session.user = user
                            console.log('TEST JE SUIS LE USER : ', user);
                            let accessToken = jwt.sign(
                                {
                                    email: user.email,
                                    civilite: user.civilite,
                                    nom: user.nom, 
                                    prenom: user.prenom,
                                    telephone: user.telephone,
                                    slug: user.slug,
                                    // photoURL: 'https://avatars.githubusercontent.com/u/49784762?s=400&u=613c3e4a4f15dbfe4f151cce84b5f7ae1e41bf4a&v=4',
                                    permissions: user.roles
                                },
                                config.appKey,
                                {expiresIn: 604800}
                            );       
                            new Cookies(req,res).set('access_token', accessToken, {httpOnly: true, secure: false });
                            console.log('req.session ', req.session);
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
