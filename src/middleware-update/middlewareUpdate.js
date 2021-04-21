let RealtyRepository = require('../repository/RealtyRepository.js');

module.exports = (req, res, next) => {
    (new RealtyRepository).get_un_seul_bien({slug : req.params.slug}).then((UnSeulBien) => {
        res.locals.UnSeulBien = UnSeulBien;
        next();
    });
};