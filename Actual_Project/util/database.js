const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient
    .connect('mongodb+srv://test:test123@node-mongo-practice-cluster-fttfq.mongodb.net/test?retryWrites=true&w=majority',{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(client => {
        // console.log('connected to mongodb: ', client);
        callback(client);
    })
    .catch(error => {
        // console.log('error connecting to mongodb: ', error);
        callback(error);
    });
}

module.exports = mongoConnect;
