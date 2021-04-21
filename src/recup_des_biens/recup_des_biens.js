let RealtyRepository = require('../repository/RealtyRepository.js');

module.exports = (req, res, next) => {

    (new RealtyRepository).get_les_biens().then((lesBiens) => {
        res.locals.toutLesBiens = lesBiens;
        next();
    });
};