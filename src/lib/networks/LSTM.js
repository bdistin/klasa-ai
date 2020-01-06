const QueuedNetwork = require('./QueuedNetwork');
const { recurrent } = require('brain.js');

class LSTM extends QueuedNetwork {

}

LSTM.Network = recurrent.LSTM;

module.exports = LSTM;