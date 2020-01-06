const { Structures, Collection } = require('discord.js');

Structures.extend('GuildMember', GuildMember => {

    class AIGuildMember extends GuildMember {

        constructor(...args) {
            super(...args);

            this.banHits = new Collection();
        }

    }

    return AIGuildMember;

});
