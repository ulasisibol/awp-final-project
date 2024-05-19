var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adminSchema = new Schema({

    homeTitle1: String,
    homeText1: String,
    homeCurrently: String,

    card1imgUrl: String,
    card2imgUrl: String,
    card3imgUrl: String,
    card1Title: String,
    card2Title: String,
    card3Title: String,
    card1Name: String,
    card2Name: String,
    card3Name: String,
    card1Text: String,
    card2Text: String,
    card3Text: String,
    card1live: String,
    card2live: String,
    card3live: String,
    card1Github: String,
    card2Github: String,

    card3Github: String,
    skils1Title: String,
    skils2Title: String,
    skils3Title: String,
    skils1Text: String,
    skils2Text: String,
    skils3Text: String,

    aboutMeHeader: String,
    aboutMeText: String,
    aboutMeImgUrl: String,

    contactHeader: String,
    contactText: String,
    contactImgUrl: String,

    messageMeHeader: String,
    messageMeText: String,
    messageMeIcon: String,


});

var Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;