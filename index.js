#!/usr/bin/env node

require('dotenv').config();
const chalk = require('chalk');
const axios = require('axios');

const [word] = process.argv.slice(2);

const options = {
    "url": `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?strictMatch=false`,
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

        const definitions = []

        return results.map(el => {
            el.lexicalEntries.map(el => {
                console.log('\n' + chalk.hex('#c7c7c7')('*') + ' ' + chalk.cyan(`"${word}"`) + ' ' + chalk.green(`(${el.lexicalCategory.text})`) + ':');

                el.entries[0].senses.map(el => {
                    definitions.push(el.definitions)
                })

                definitions.map((el, i) => console.log('\t' + chalk.yellow(`${i + 1}.`) + ' ' + el));
            })
        })
    })
    .catch(error => console.log(error));