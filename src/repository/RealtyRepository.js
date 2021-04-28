require('../../app/database.js');

const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const RealtySchema = mongoose.Schema({
    adresse_du_bien : {
        nom_vendeur: { type: String },
        adresse: { type: String },
        code_postal: { type: String},
        ville: { type: String },
        info_complementaire_adresse: { type: String }
    },
    contact_du_bien : {
        civilite : {type: String, match: /[1-2]{1}/},
        nom: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
        prenom: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
        email: { type: String },
        mobile: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
        telephone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
        info_complementaire_contact: { type: String }
    },
    information_du_bien : {
        type_bien: {type: String, match: /[1-6]{1}/},
        prix_net_vendeur: { type: Number },
        commision: { type: Number },
        surface: { type: Number },
        nbr_piece: { type: Number },
        type_ventes: {type: String, match: /[1-3]{1}/},
        info_complementaire_bien: { type: String }
    },
    urlImage: {type: Array},
    slug: { type: String, slug: [["contact_du_bien.nom"], ["contact_du_bien.prenom"]], unique: true }
},{versionKey: false}
);

module.exports = class RealtyRepository {
    constructor() {
        this.db = mongoose.model('Bien', RealtySchema);
    }

    async add_un_bien(entity){
        return await this.db.create(entity);
    }

    async supprimer_un_bien(search){
        return await this.db.deleteOne(search)
    }

    async get_les_biens(){
        return await this.db.find({});
    }

    async get_un_seul_bien(search){
        console.log("tatatatatatatatatat", search)
        return await this.db.findOne(search).exec();
    }

    update_un_bien(search, chose_a_modifier){
        return this.db.findOneAndUpdate(search, chose_a_modifier)
    }
};