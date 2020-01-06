const { readJSON, writeJSON, pathExists } = require('fs-nextra');
const { resolve } = require('path');

class QueuedNetwork {

    constructor(client, id, options = {}) {
        this.client = client;
        this.path = resolve('fingerprints', id)
        this.id = id;
        this.brain = new this.constructor.Network(options);
        this.data = [];
        this.trained = false;
    }

    run(data) {
        return this.brain.run(data);
    }

    push(data) {
        this.data.push(data);
    }

    get formattedData() {
        return this.data;
    }

    async train() {
        await this.brain.trainAsync(this.formattedData, {
            errorThresh: .016,
            log: this.client.console.log.bind(this.client.console, `[${this.id}]`)
        });

        this.data.length = 0;

        await writeJSON(this.path, this.brain);

        this.trained = true;
    }

    async init() {
        if (await pathExists(this.path)) {
            this.brain.fromJSON(await readJSON(this.path));
            this.trained = true;
        }
    }

}

module.exports = QueuedNetwork;