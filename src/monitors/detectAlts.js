const { Monitor } = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { enabled: false, ignoreOthers: false });
    }

    async run(message) {
        if (message.channel.type !== 'text' || !message.content) return;
        
        if (!message.guild.network.trained) {
            // we don't have any data, we need to use all new data to train
            message.guild.network.set(message.id, message.content, message.author.id);
            return;          
        }

        const commonality = this.client.commonPhrases.trained ?
            this.client.commonPhrases.run(message.content) :
            undefined;
        const id = message.guild.network.run(message.content);

        this.client.console.log(commonality, id, message.author.id, id === message.author.id);

        // If we are confident that what is said isn't common, we should attribute the content to the author
        if (commonality !== 'common') {
            message.guild.network.set(message.id, message.content, message.author.id);

            message.guild.attempts++;

            if (message.author.id !== id) {
                const user = await message.guild.members.fetch(id).catch(() => null);

                if (user) {
                    // if other people say that, it should be considered common
                    this.client.commonPhrases.set(message.id, message.content, 'common');
                } else {
                    if (message.guild.bans.has(id)) {
                        // We have detected alt evasion, make note of it
                        message.member.banHits.set(id, (message.member.banHits.get(id) || 0) + 1);
                    }
                }
            } else {
                // The attribution was correctly determined, keep the commonality low
                this.client.commonPhrases.set(message.id, message.content, 'uncommon');

                message.guild.success++;
            }

            return;
        }

        // What was said was common, and really should have no bearing unless we correctly identified the user
        if (message.author.id === id) {
            message.guild.network.set(message.id, message.content, message.author.id);
            this.client.commonPhrases.set(message.id, message.content, 'uncommon');
        }
    }

	async init() {
        await this.client.commonPhrases.init();
        for (const guild of this.client.guilds.values()) {
            await guild.network.init();
            const bans = await guild.fetchBans();
            guild.bans = bans;
        }
	}

};
