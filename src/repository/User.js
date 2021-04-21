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
    slug: { type: String, slug: ["nom", "prenom"], unique: true }
},{versionKey: false}
);

module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }

    add_user(entity){
       this.db.create(entity)
    }

    async get_user_by_email(email){
        return await this.db.findOne({ email });
    }
};