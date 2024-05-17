const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteTitlesSchema = new Schema({
    homePageTitle: { type: String, required: true },
    aboutPageTitle: { type: String, required: true },
    contactPageTitle: { type: String, required: true }
});

const SiteTitles = mongoose.model('SiteTitles', siteTitlesSchema);

module.exports = SiteTitles;