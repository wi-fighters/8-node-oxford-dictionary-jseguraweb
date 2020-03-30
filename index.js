require('dotenv').config()
const axios = require('axios')

const [word] = process.argv.slice(2)

const options = {
    "url": `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}?fields=definitions&strictMatch=false`,
    "method": "GET",
    "Accept": "application/json",
    "headers": {
        'app_id': process.env.APP_ID,
        'app_key': process.env.APP_KEY
    }
};

axios(options)
    .then(res => {
        const results = res.data.results;
        const lexicalCategory = results.map(el => el.lexicalEntries[0].lexicalCategory.text);
        const senses = results.map(el => el.lexicalEntries[0].entries[0].senses.map(el => el))[0]
        const arrayOfDefinitions = [...senses.map(el => el.definitions[0])];
        const definitions = arrayOfDefinitions.map((definition, i) => `${i + 1}. ${definition}`).join(',\n')

        console.log(`"${word}" (${lexicalCategory})`);
        console.log(definitions);
    })
    .catch(error => console.log(error))

