module.exports = class Home {
    print(request, response) {
        response.render('home');
    }
    printBienUnParUn(request, response) {
        response.render('homeUnParUn');
    }
};
