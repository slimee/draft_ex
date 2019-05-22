export default () => {
    mongoose.set('debug', true);
    var mongoose_uri = process.env.MONGOOSE_URI || "mongodb://abc:abc123@localhost:27017/databank?authSource=admin";
    var mongoDB_Options = {
        useMongoClient: true,
        poolSize: 10,
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        reconnectInterval: 300000,
        reconnectTries: 10,
        autoReconnect: true
    };

    let connected = new Promise((accept, reject) => {
        mongoose.connection.on('connected', ()=>{
            accept();
})
})
    mongoose.connect(mongoose_uri, mongoDB_Options);

    return connected
}