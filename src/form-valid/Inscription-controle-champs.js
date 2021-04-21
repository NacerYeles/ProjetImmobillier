module.exports = (req, res, next) => {
    let entity = req.body;
    // je prend pas les clef de entity car pour une question de sécurité, il vaut mieux ecrire les clef en dur dans un nouveau tableau
    // plutot que reprendre les clef du formulaire car l'utilisateur peu tres bien les modifier à la main
    // let lesclefdeObject = Object.keys(["email", "mdp", "civilite", "nom", "prenom", "telephone"]);
    // lesclefdeObject.forEach((element) => entity[element] === '' ? cmptDeuxOuPlusieurChampsNonRempli++ : console.log('toto'));

    let errors = [];
    // console.log(entity);
    if(!entity.telephone.match(/^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/)){
       errors.push(new Error(`Mauvais de numéro de téléphone, veuillez rentrer un numéro correct`));
    }

    ["email", "mdp", "civilite", "nom", "prenom", "telephone"].forEach(key => {
        if(entity[key] === '' || entity[key] === undefined) {
            errors.push(new Error(`veuillez remplir le champs ${key}`));
        }
    });

    if(errors.length > 0) {
        errors.forEach(error => {
            req.flash('error', error.message);
        });
        res.redirect('/Inscription');
    } else {
        req.flash('notify', 'Votre compte a bien été créé.');
        next();
    }   
};