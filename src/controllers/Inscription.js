let User = require('../repository/User.js');
let bcrypt = require('bcryptjs');

module.exports = class Inscription {
    print(request, response) {
        response.render('inscription');  
    }
    async insert_form(request, response){
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
            telephone: request.body.telephone
        }
        
        await (new User).add_user(entity);
        response.redirect('/');
    }

    deconnexion_user(request, response){
        request.session.user = null
        response.redirect('/')
    }
};
