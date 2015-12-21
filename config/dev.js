module.exports = {
    node: {
        "port": 3000
    },
    db: {
        mongo: [{
            name: "b2b",
            host :"127.0.0.1",
            database: "LeagueSummaryDB",
            port: "27017",
            mongoUri: "mongodb://localhost"
        }]
    }
}
