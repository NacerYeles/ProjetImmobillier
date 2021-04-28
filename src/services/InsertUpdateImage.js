let UploadImageProductService = require('../services/UploadImageProduct.js');

module.exports = class InsertUpdateImage {
    insertOrUpdate(request) {
        let photos = [];
        // Enregistrement des images
        if(typeof request.files !== 'undefined' && request.files !== null) {
            console.log("le nom de la photo est  : ", request.files.photos);

            if (typeof request.files.photos[0] === 'undefined') {
                //je stocke mon image dans un tableau
                let img = request.files.photos;
                request.files.photos = new Array();
                request.files.photos.push(img);
            }

            const UploadImageProduct = new UploadImageProductService();
            if(typeof request.files.photos != 'undefined' && request.files.photos.length > 0) {
                // console.log('request.files.photos : ', request.files.photos);
                Object.values(request.files.photos).forEach((file) => {
                    photos.push(UploadImageProduct.moveFile(file));
                });
            }
        }

        return photos
    }
}