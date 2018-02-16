const sqlite3 = require('sqlite3').verbose();
let database = new sqlite3.Database('config/database.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

module.exports = database