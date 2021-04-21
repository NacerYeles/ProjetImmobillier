module.exports = (request, response, next) => { 
    let saveBody = request.body;
    request.body = {};
    Object.keys(saveBody).forEach((key) => {
        let newKey = key.replace(']', '').split('[');
        if(typeof request.body[newKey[0]] == 'undefined') {
            request.body[newKey[0]] = {};
        }
        request.body[newKey[0]][newKey[1]] = saveBody[key];
    });
    next();
}
