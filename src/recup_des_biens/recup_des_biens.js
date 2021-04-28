let RealtyRepository = require('../repository/RealtyRepository.js');

module.exports = (req, res, next) => {

    (new RealtyRepository).get_les_biens().then((lesBiens) => {
        res.locals.toutLesBiens = lesBiens;
        // lesBiens.forEach((e,i) => lesBiens[0] ? console.log('sa marche') : console.log('marche pas'));
        //console.log("lesBiens.urlImage : ", lesBiens);
        next();
    });
};