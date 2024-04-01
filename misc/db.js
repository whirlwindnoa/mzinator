const sqlite3 = require("sqlite3");

class Database {
    constructor(name) {
        this.name = name;
        this.init();
    }

    async init() {
        var connection = await new Promise((resolve, reject) => {
            // connect to the database
            this.db = new sqlite3.Database(env.DATABASE_PATH, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                console.log('connected to the database');
                resolve();
            });
        });

        // create tables if they do not exist
        this.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER UNIQUE PRIMARY KEY,
                base REAL,
                money REAL,
                lastclaim INTEGER
            );`
        )

        return connection;
    }

    async run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve();
            });
        });
    }

    async get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, function (err, results) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    }

    async all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, function (err, results) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = Database;