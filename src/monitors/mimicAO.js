const { Monitor } = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(message) {
        if (message.channel.type !== 'text' || !message.content) return;
        if (message.author === this.client.owner) return this.client.mimicAO.push(message.content);
        if (this.client.mimicAO.trained && Math.random() > 0.1) return message.send(this.client.mimicAO.run(message.content));
    }

	async init() {
        await this.client.mimicAO.init();
	}

};
