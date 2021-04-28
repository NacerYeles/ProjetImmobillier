let User = require('../repository/User.js');

module.exports = (req, res, next) => {
    console.log('{slug: request.params.slug}zzzzzzz', {slug: req.params.slug});
    (new User).get_un_seul_user({slug : req.params.slug}).then((UnSeulUser) => {
        res.locals.UnSeulUser = UnSeulUser;
        console.log("lililalafffffflala : ", UnSeulUser);
        next();
    });
};