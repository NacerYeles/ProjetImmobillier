module.exports = () =>{
    return {
        // Erreur 405 : Method not Allowed
        error405(req, res, next) {
            res.status(405).render('errors/error_405');
        },
        // Erreur 404 : Page not Found
        error404(req, res, next) {
            res.status(404).render('errors/error_404');
        },
        // Erreur 409 : Token pas égal avec celui envoyer en requete POST
        error409(req, res, next) {
            res.status(409).render('errors/error_409');
        }
    }
} 
