let RealtyRepository = require('../repository/RealtyRepository.js');
let UploadImageProductService = require('../services/UploadImageProduct.js');

module.exports = class Realty {
    printAdministration(request, response) {
        response.render('admin/dashboard');
    }

    printRegister(request, response){
        // console.log("ok je suis entrer dans le printRegister");
        response.render('admin/realty/form');
    }

    printListeBien(request, response){
        // console.log(response.locals);
        response.render('admin/realty/listeBiens');
    }

    async insertion_bien(request, response){
        // console.log('teste ==== ', request.body);
        let enregistrer_un_bien = {
            adresse_du_bien : {
                nom_vendeur: request.body.nom_vendeur ,
                adresse: request.body.adresse ,
                code_postal: request.body.code_postal ,
                ville: request.body.ville ,
                info_complementaire_adresse: request.body.info_complementaire_adresse
            },
            contact_du_bien : {
                nom: request.body.nom ,
                prenom: request.body.prenom ,
                email: request.body.email ,
                mobile: request.body.mobile ,
                telephone: request.body.telephone ,
                info_complementaire_contact: request.body.info_complementaire_contact
            }
        }

        let photos = [];
        // Enregistrement des images
        if(typeof request.files !== 'undefined' && request.files !== null) {
            // let laclef = Object.keys(request.files).toString();
            console.log("le nom de la photo est  : ", request.files.photos);
            const UploadImageProduct = new UploadImageProductService();
            if(typeof request.files.photos != 'undefined' ) {
                // console.log('request.files.photos : ', request.files.photos);
                Object.values(request.files.photos).forEach((file) => {
                    console.log("file.name : ", file.name);
                    photos.push(UploadImageProduct.moveFile(file));
                });
            }
        }
        console.log('voici ce que contient mon tableau de photos AAAAAAAA ', photos);
        Promise.all(photos).then(async (values) => {
            request.flash('success', `Le bien a été enregistré`);
            // console.log(enregistrer_un_bien);
            await (new RealtyRepository).add_un_bien(enregistrer_un_bien);
            response.redirect('/admin/realty/liste-des-biens');
        });
    }
    
   async delete_Un_bien(request, response){
    //    console.log("request.params.nom : ", {slug: request.params.slug});
       await (new RealtyRepository).supprimer_un_bien({slug: request.params.slug});
       response.redirect('/admin/realty/liste-des-biens');
    }

    async update_Un_bien(request, response){
        //console.log('=>'+request.params.slug);
        // console.log('njbncqbsneliufbqlzoif : ', request.body);
        await (new RealtyRepository).get_un_seul_bien({slug: request.params.slug}).then(async (UnSeulBien) => {
            //response.locals.UnSeulBien = UnSeulBien;
            //console.log("UnSeulBien : ", UnSeulBien);
            let update_un_bien = {
                adresse_du_bien : {
                    nom_vendeur: request.body.nom_vendeur != undefined ? request.body.nom_vendeur : UnSeulBien.adresse_du_bien.nom_vendeur ,
                    adresse: request.body.adresse != undefined ? request.body.adresse : UnSeulBien.adresse_du_bien.adresse  ,
                    code_postal: request.body.code_postal != undefined ? request.body.code_postal : UnSeulBien.adresse_du_bien.code_postal  ,
                    ville: request.body.ville != undefined ?  request.body.ville : UnSeulBien.adresse_du_bien.ville  ,
                    info_complementaire_adresse: request.body.info_complementaire_adresse != undefined ?  request.body.info_complementaire_adresse : UnSeulBien.adresse_du_bien.info_complementaire_adresse 
                },
                contact_du_bien : {
                    nom: request.body.nom != undefined ? request.body.nom : UnSeulBien.contact_du_bien.nom ,
                    prenom: request.body.prenom != undefined ?  request.body.prenom : UnSeulBien.contact_du_bien.prenom ,
                    email: request.body.email != undefined ?  request.body.email : UnSeulBien.contact_du_bien.email ,
                    mobile: request.body.mobile != undefined ? request.body.mobile : UnSeulBien.contact_du_bien.mobile ,
                    telephone: request.body.telephone != undefined ? request.body.telephone : UnSeulBien.contact_du_bien.telephone ,
                    info_complementaire_contact: request.body.info_complementaire_contact != undefined ?  request.body.info_complementaire_contact : UnSeulBien.contact_du_bien.info_complementaire_contact
                }
            }
            //console.log('UnSeulBien.adresse_du_bien.nom_vendeur : ', UnSeulBien.adresse_du_bien.nom_vendeur);
            // console.log("update_un_bien : ", update_un_bien);
            
            await (new RealtyRepository).update_un_bien({slug: request.params.slug}, update_un_bien)
        });
         
        response.redirect('/admin/realty/liste-des-biens');
     }
};
