let RealtyRepository = require('../repository/RealtyRepository.js');
let InsertUpdateImage = require('../services/InsertUpdateImage.js');

module.exports = class Realty {
    printAdministration(request, response) {
        // console.log("EST CE QUE JE PEU RECUPËRER LES VALEUR DU COOKIES : ", request.cookies);
        response.render('admin/dashboard');
    }

    printRegister(request, response){
        response.render('admin/realty/form');
    }

    printListeBien(request, response){
        response.render('admin/realty/listeBiens');
    }

    async insertion_bien(request, response){

        let InsertImage = new InsertUpdateImage();

        Promise.all(InsertImage.insertOrUpdate(request)).then(async (value) => {
            let enregistrer_un_bien = {
                adresse_du_bien : {
                    nom_vendeur: request.body.nom_vendeur ,
                    adresse: request.body.adresse ,
                    code_postal: request.body.code_postal ,
                    ville: request.body.ville ,
                    info_complementaire_adresse: request.body.info_complementaire_adresse
                },
                contact_du_bien : {
                    civilite: request.body.civilite ,
                    nom: request.body.nom ,
                    prenom: request.body.prenom ,
                    email: request.body.email ,
                    mobile: request.body.mobile ,
                    telephone: request.body.telephone ,
                    info_complementaire_contact: request.body.info_complementaire_contact
                },
                information_du_bien : {
                    type_bien: request.body.type_bien ,
                    prix_net_vendeur: request.body.prix_net_vendeur ,
                    commision: request.body.commision ,
                    surface: request.body.surface ,
                    nbr_piece: request.body.nbr_piece ,
                    type_ventes: request.body.type_ventes ,
                    info_complementaire_bien: request.body.info_complementaire_bien
                },
                urlImage: value
            }
            console.log('LA VALUE DES PHOTOS : ', value);
            request.flash('success', `Le bien a été enregistré`);
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
        let UpdateImage = new InsertUpdateImage();

        await (new RealtyRepository).get_un_seul_bien({slug: request.params.slug}).then(async (UnSeulBien) => {

            await Promise.all(UpdateImage.insertOrUpdate(request)).then(async (value) => {
                let photos = [];
                photos.push(...UnSeulBien.urlImage);
                if(value.length > 0) {
                    photos.push(...value)
                }
                console.log('photos',photos);
                let update_un_bien = {
                    adresse_du_bien : {
                        nom_vendeur: request.body.nom_vendeur != undefined ? request.body.nom_vendeur : UnSeulBien.adresse_du_bien.nom_vendeur ,
                        adresse: request.body.adresse != undefined ? request.body.adresse : UnSeulBien.adresse_du_bien.adresse  ,
                        code_postal: request.body.code_postal != undefined ? request.body.code_postal : UnSeulBien.adresse_du_bien.code_postal  ,
                        ville: request.body.ville != undefined ?  request.body.ville : UnSeulBien.adresse_du_bien.ville  ,
                        info_complementaire_adresse: request.body.info_complementaire_adresse != undefined ?  request.body.info_complementaire_adresse : UnSeulBien.adresse_du_bien.info_complementaire_adresse 
                    },
                    contact_du_bien : {
                        civilite: request.body.civilite != undefined ? request.body.civilite : UnSeulBien.contact_du_bien.civilite ,
                        nom: request.body.nom != undefined ? request.body.nom : UnSeulBien.contact_du_bien.nom ,
                        prenom: request.body.prenom != undefined ?  request.body.prenom : UnSeulBien.contact_du_bien.prenom ,
                        email: request.body.email != undefined ?  request.body.email : UnSeulBien.contact_du_bien.email ,
                        mobile: request.body.mobile != undefined ? request.body.mobile : UnSeulBien.contact_du_bien.mobile ,
                        telephone: request.body.telephone != undefined ? request.body.telephone : UnSeulBien.contact_du_bien.telephone ,
                        info_complementaire_contact: request.body.info_complementaire_contact != undefined ?  request.body.info_complementaire_contact : UnSeulBien.contact_du_bien.info_complementaire_contact
                    },
                    information_du_bien : {
                        type_bien: request.body.type_bien != undefined ? request.body.type_bien : UnSeulBien.information_du_bien.type_bien ,
                        prix_net_vendeur: request.body.prix_net_vendeur != undefined ? request.body.prix_net_vendeur : UnSeulBien.information_du_bien.prix_net_vendeur ,
                        commision: request.body.commision != undefined ? request.body.commision : UnSeulBien.information_du_bien.commision ,
                        surface: request.body.surface != undefined ? request.body.surface : UnSeulBien.information_du_bien.surface ,
                        nbr_piece: request.body.nbr_piece != undefined ? request.body.nbr_piece : UnSeulBien.information_du_bien.nbr_piece ,
                        type_ventes: request.body.type_ventes != undefined ? request.body.type_ventes : UnSeulBien.information_du_bien.type_ventes ,
                        info_complementaire_bien: request.body.info_complementaire_bien != undefined ? request.body.info_complementaire_bien : UnSeulBien.information_du_bien.info_complementaire_bien
                    },
                    urlImage: photos
                    //value.forEach(e => UnSeulBien.urlImage.push(e)
                };


                //value === [] ? [] : UnSeulBien.urlImage.push(value)
                // value.forEach(e => console.log('e : ', e))
                // console.log("UnSeulBien.urlImage : ", UnSeulBien.urlImage.push({1: "toto"}));
                console.log('value : ', UnSeulBien.urlImage);
                await (new RealtyRepository).update_un_bien({slug: request.params.slug}, update_un_bien);

                response.redirect('/admin/realty/liste-des-biens');
            });
            
        });
         
        
     }
};
