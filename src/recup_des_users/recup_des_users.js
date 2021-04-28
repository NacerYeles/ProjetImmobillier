let User = require('../repository/User.js');

module.exports = (req, res, next) => {
    (new User).get_les_users().then((lesUsers) => {
        res.locals.toutLesUsers = lesUsers;
        console.log("lesUsers : ", lesUsers[0].telephone);
        next();
    });
};