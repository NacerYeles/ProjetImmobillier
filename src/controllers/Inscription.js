let User = require('../repository/User.js');
let bcrypt = require('bcryptjs');
const Cookies = require( "cookies" );
let errorsHTTP = require('../../app/errorsHTTP.js')();
let MailerService = require('../services/Mailer.js');
let TokenCRF = require('../middleware-CRF/crf-token.js');

module.exports = class Inscription {
    print(request, response) {
        response.render('inscription');  
    }

    printPasswordConfirm(request, response) {
        response.render('mails/regenerate_mail_confirme');  
    }

    printPasswordLost(request, response) {
        response.render('regenerate_password');  
    }

    printListeUser(request, response){
        response.render('admin/realty/listeBiens');
    }

    printRegisterUser(request, response){
        response.render('inscription');
    }

    async compareAndConfirmeResetPassword(request, response){
        let tokendansURL = request.params.tokenReset;
        let newPassword = request.body.tokenResetPassword;
        let newPasswordVerif = request.body.tokenResetPasswordConfirme;

        await (new User).get_un_seul_user({tokenResetPassword : tokendansURL}).then(async (result) => {
                if( tokendansURL ===  result.tokenResetPassword){
                    let updateMdp = {
                        mdp: bcrypt.hashSync(
                            newPassword,
                            bcrypt.genSaltSync(10)
                        )
                    }
                    await (new User).update_un_user({tokenResetPassword : tokendansURL}, updateMdp);
                    request.flash('notify', 'Votre mot de passe a été modifier avec success');
                    response.redirect(`/`);
                }else{
                    request.flash('error', 'erreur de token');
                    response.redirect(`/reset_password/${tokendansURL}`);
                }
        });

    }

    async process_reset_password(request, response, app) {
        let mailer = new MailerService();
        let email = request.body.email;
        console.log('TESTE : ' , request.session);
        let addTokenPourMail = {
            tokenResetPassword: request.session.csrfPassword,
            dateToken: Date.now()
        }

        // On vérifie si l'adresse email existe dans notre BDD
        await (new User).get_user_by_email(email).then(async (result) => {
            let tplMail;
            let data = {
                url: response.locals.url
            };
            let subject = '';
            // si l'email existe
            if(result) {
                // on envoi le mail
                // console.log(html);
                await (new User).update_un_user({email : email}, addTokenPourMail)
                tplMail = 'regenerate_mail_password';
                subject = 'Mot de passe oublié';
                data.csrfPassword = request.session.csrfPassword;
            } else{
                tplMail = 'regenerate_mail_inscription';
                subject = 'Mot de passe oublié';
            }

            // On génére le mail
            app.render('mails/' + tplMail, data, async (err, html) => {
                mailer.send(email, subject, html);
            });

            // Dans tout les cas on met une flashbag et une redirection
            request.flash('notify', 'Un mail vous a été envoyé.');
            response.redirect('/');
        });

    }


    async insert_form_user(request, response){
        console.log('Got body:', request.body);
        let entity = {
            email: request.body.email,
            mdp: bcrypt.hashSync(
                    request.body.mdp,
                    bcrypt.genSaltSync(10)
                ),
            civilite: request.body.civilite,
            nom: request.body.nom,
            prenom: request.body.prenom,
            telephone: request.body.telephone,
            civilite: request.body.civilite
        }
        
        await (new User).add_user(entity);
        response.redirect('/admin/realty/liste-des-collaborateurs');
    }

    async insert_form(request, response){
        // console.log(request.session)
        // console.log('Got body:', request.body.csrf);
        // console.log('le token global : ', request.session.csrf);
        // console.log('le session AAAAAAAAAAAAAAAAAAAA ', request.session.token);
        let entity = {
                email: request.body.email,
                mdp: bcrypt.hashSync(
                        request.body.mdp,
                        bcrypt.genSaltSync(10)
                    ),
                civilite: request.body.civilite,
                nom: request.body.nom,
                prenom: request.body.prenom,
                telephone: request.body.telephone,
                roles: request.body.roles != undefined ? request.body.roles : 'pas-admin'
        }
    
        // console.log('entity : ', entity);
    
        await (new User).add_user(entity);
    
        if(request.body.roles != undefined){
            response.redirect('/admin/realty/liste-des-collaborateurs');
        }else{
            response.redirect('/');
        }
    
        // await (new User).add_user(entity);
        // response.redirect('/');
        
    }

    async update_un_user(request, response){
        console.log("request.body : ", request.body);
        console.log('{slug: request.params.slug} : ', {slug: request.params.slug});
        await (new User).get_un_seul_user({slug: request.params.slug}).then(async (UnSeulUser) => {
            console.log('je tests si je recup bien lurl: ', UnSeulUser);

            let update_un_user = {
                    email: request.body.email != undefined ? request.body.email : UnSeulUser.email ,
                    civilite: request.body.civilite != undefined ? request.body.civilite : UnSeulUser.civilite  ,
                    nom: request.body.nom != undefined ? request.body.nom : UnSeulUser.nom  ,
                    prenom: request.body.prenom != undefined ?  request.body.prenom : UnSeulUser.prenom  ,
                    telephone: request.body.telephone != undefined ?  request.body.telephone : UnSeulUser.telephone,
                    roles : request.body.roles != undefined ? request.body.roles : UnSeulUser.roles
            };

            await (new User).update_un_user({slug: request.params.slug}, update_un_user);

            response.redirect('/admin/realty/liste-des-collaborateurs');

        })
    }

    async delete_Un_user(request, response){
       await (new User).supprimer_un_user({slug: request.params.slug});
       response.redirect('/admin/realty/liste-des-collaborateurs');
    }

    deconnexion_user(request, response){
        // request.session.user = null
        new Cookies(request,response).set('access_token', {maxAge: 0});
        response.redirect('/');
    }
};
