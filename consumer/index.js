const Kafka = require('node-rdkafka');
const hurricane = require('../hurricane.js');

console.log("*** Consumer starts... ***");

const consumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092'
}, {});

consumer.connect();

consumer.on('ready', () => {
    console.log('Consumer ready...');
    consumer.subscribe(['task']);
    consumer.consume();
}).on('data', function (data) {
    console.log("Received weather announcement:", "\n", `${hurricane.fromBuffer(data.value)}`);
});