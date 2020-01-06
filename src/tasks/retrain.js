const { Task } = require('klasa');

module.exports = class extends Task {

	async run() {
		await this.client.mimicAO.train();
		/* for (const guild of this.client.guilds.values()) {
			await guild.network.train();
		} */
	}

};
