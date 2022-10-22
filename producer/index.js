const Kafka = require('node-rdkafka');
const hurricane = require('../hurricane.js');
console.log("*** Producer starts... ***");

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, { topic: 'task' });

function queueRandomWeather() {
    const category = getRandomNumber();
    const speed = getSpeed(category);
    const description = getDescription(category);
    const random = { category, speed, description };
    const success = stream.write(hurricane.toBuffer(random));
    if (success) {
        console.log("Weather announcement queued", "\n", `${JSON.stringify(random)}`);
    } else {
        console.log('Too many announcements already..');
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * (10 - 1 + 1) + 1);
}

function getSpeed(category) {
    if (category === 1) {
        const speed = '74-95 mph, 64-82 kt, 119-153 km/h';
        return speed;
    } else if (category === 2) {
        const speed = '96-110 mph, 83-95 kt, 154-177 km/h';
        return speed;
    } else if (category === 3) {
        const speed = '111-129 mph, 96-112 kt, 178-208 km/h';
        return speed;
    } else if (category === 4) {
        const speed = '130-156 mph, 113-136 kt, 209-251 km/h';
        return speed;
    } else if (category === 5) {
        const speed = '157 mph or higher, 137 kt or higher, 252 km/h or higher';
        return speed;
    } else {
        return 'Wind speed not significant';
    }
}

function getDescription(category) {
    if (category === 1) {
        const description = 'Very dangerous winds will produce some damage';
        return description;
    } else if (category === 2) {
        const description = 'Extremely dangerous winds will cause extensive damage';
        return description;
    } else if (category === 3) {
        const description = 'Devastating damage will occur';
        return description;
    } else if (category === 4) {
        const description = 'Catastrophic damage will occur';
        return description;
    } else if (category === 5) {
        const description = 'Catastrophic damage will occur';
        return description;
    } else {
        return 'All good';
    }
}

setInterval(() => {
    queueRandomWeather();
}, 15000);