const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'displays the accuracy that the ai can correctly attribute messages',
        });
    }

    async run(message, []) {
        return message.send(`The current accuracy is ${(message.guild.success / message.guild.attempts * 100).toFixed(2)}%`);
    }

};
