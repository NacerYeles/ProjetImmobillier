const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://root:w1SlhtgZrmmXTlIS@serverlapasserelle.1rmxt.mongodb.net/immobilier?retryWrites=true&w=majority', 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true  }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});
