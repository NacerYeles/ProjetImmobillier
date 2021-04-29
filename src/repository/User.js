require('../../app/database.js');

const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const UserSchema = mongoose.Schema({
    email: { type: String },
    mdp: { type: String },
    civilite: { type: String, match: /^[1-2]{1}$/ },
    nom: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    prenom: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    telephone: { type: String , match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    date: { type: Date, default: Date.now },
    slug: { type: String, slug: ["nom", "prenom"], unique: true },
    roles: { type: Array },
    tokenResetPassword: { type: Array }
},{versionKey: false}
);

module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }

    async add_user(entity){
       return await this.db.create(entity)
    }

    async get_user_by_email(email){
        return await this.db.findOne({ email });
    }

    async get_les_users(){
        return await this.db.find({});
    }

    async get_un_seul_user(search){
        return await this.db.findOne(search).exec();
    }

    update_un_user(search, chose_a_modifier){
        return this.db.findOneAndUpdate(search, chose_a_modifier)
    }

    async supprimer_un_user(search){
        return await this.db.deleteOne(search)
    }

};