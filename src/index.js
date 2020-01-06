const { Client } = require('klasa');
const { config, token } = require('./config.js');
const LSTM = require('./lib/networks/LSTM.js');

require('./lib/extensions/AIGuild');
require('./lib/extensions/AIGuildMember');


class MyKlasaClient extends Client {

    constructor(...args) {
        super(...args);

        this.mimicAO = new LSTM(this, 'mimicAO');
    }

}

new MyKlasaClient(config).login(token);
