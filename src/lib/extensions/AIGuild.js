const { Structures } = require('discord.js');

Structures.extend('Guild', Guild => {

    class AIGuild extends Guild {

        constructor(...args) {
            super(...args);

            // this.network = new Classifier(this.client, this.id);
            this.bans = null;
            this.attempts = 0;
            this.success = 0;
        }

    }

    return AIGuild;

});
