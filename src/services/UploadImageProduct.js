const config = require('../../app/config.js');
 
module.exports = class UploadImageProduct {
    moveFile(file) {
        return new Promise((resolve, reject) => {
            const regex = /[^a-z0-9_\.]/i;
            let baseName = file.name.replace(regex,'_').replace('__','_');
            let uploadPath = config.directory_product_image+'/'+baseName;
            console.log("baseName : ", baseName);
            console.log("uploadPath : ", uploadPath);
            file.mv(uploadPath, (err) => {
                console.log(err);
                if(err) reject();

                resolve(baseName);
            } );
        });
    }
}