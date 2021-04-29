module.exports = {
    directory_product_image : __dirname+'/../public/images/products',
    appKey: 'cf0d9c3385323d6c70d38357a8aa9385a',
    nomDuSite: 'ProjetImmobilier',
    smtp: {
        service: 'gmail',
        auth: {
            user: 'nacerProjetImmo@gmail.com',
            pass: 'Lapasserelle58'
        }
    },
    port : process.env.PORT || 3000
};