let User = require('../repository/User.js');

module.exports = (request, response, next) => {

    let newPassword = request.body.tokenResetPassword;
    let newPasswordVerif = request.body.tokenResetPasswordConfirme;
    let tokendansURL = request.params.tokenReset;    

    if(newPassword !== newPasswordVerif || newPassword === '' || newPasswordVerif === ''){

        request.flash('error', 'les deux champs doivent être rempli et identique pour valider votre mot de passe');
        response.redirect(`/reset_password/${tokendansURL}`);
    }else{
        next();
    }

};