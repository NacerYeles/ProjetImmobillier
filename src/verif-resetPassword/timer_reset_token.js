let User = require('../repository/User.js');
let errorsHTTP = require('../../app/errorsHTTP.js')();

module.exports = (request, response, next) => {

    let tokenResetPassword = request.params.tokenReset;
    //let dateNowCompare = new Date();

    console.log('tokendansURL : ', tokenResetPassword);

    (new User).get_un_seul_user({tokenResetPassword}).then(async (result) => {
        // console.log('result ================>', result);
        if(result){
            //if(result.tokenResetPassword !== '' && result.dateToken !== ''){
                // let dateEnMilliBase = result.dateToken;//.getTime();
                // //let dateEnMilliVerif = dateNowCompare.getTime();
                // let dateEnMilliVerif = Date.now();
                // let LeNombreDeMinuteAvantDeDeleteLeToken = (dateEnMilliVerif - dateEnMilliBase) / 6000
                //let LeNombreDeMinuteAvantDeDeleteLeToken = Math.round((dateEnMilliVerif - dateEnMilliBase) / 60000);
                let resetToken = { 
                    $unset : {
                        tokenResetPassword: '',
                        dateToken: ''
                    }
                };
                console.log((Date.now()-result.dateToken)/60000);
                
                //if(LeNombreDeMinuteAvantDeDeleteLeToken > 1){
                if((Date.now()-result.dateToken)/60000 > 1) {    
                    await (new User).update_un_user({email : result.email}, resetToken);
                }
                next();
            //}
            // else{
            //     request.flash('error', 'vous avez pris trop de BBBBBBBBBBBBtemps avant de cliquer sur le lien');
            //     response.redirect(`/`);
            // }
        }else{
            request.flash('error', 'vous avez pris trop de temps avant de cliquer sur le lien, veuillez effectuer un autre envoie de mail');
            response.redirect(`/mot_de_passe_oublie`);
        }
    })

}

