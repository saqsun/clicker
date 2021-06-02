const generateFonts = require('./generate-fonts');
const generateAssets = require('./generate-assets');
const generateEventNames = require('./generate-event-names');
const generateAudiosprite = require('./generate-audiosprite');
const generateAtlases = require('./generate-atlases');
const generatePhrases = require('./generate-phrases');

module.exports = async () => {
    console.log('Starting events names generation...');
    generateEventNames();
    console.log('Events names generation is done!\n');

    console.log('Starting audiosprite generation...');
    await generateAudiosprite();
    console.log('Audiosprite generation is done!\n');

    console.log('Starting atlases generation...');
    await generateAtlases();
    console.log('Atlases generation is done!\n');

    console.log('Starting fonts generation...');
    generateFonts();
    console.log('Fonts generation is done!\n');

    console.log('Starting assets generation...');
    generateAssets();
    console.log('Assets generation is done!\n');

    console.log('Starting phrases generation...');
    generatePhrases();
    console.log('Phrases generation is done!\n');
};
