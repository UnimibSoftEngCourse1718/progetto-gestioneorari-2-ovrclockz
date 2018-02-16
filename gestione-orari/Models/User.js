let database = require('../config/database')
database.run("CREATE TABLE IF NOT EXISTS users (username STRING, password STRING)")
database.all("SELECT * FROM users", (err, row) => {
    if (err) { return console.log(err.message); }
    console.log(row)
})

class User {
    constructor(username,password){
        this.username = username;
        this.password = password;
    }

    static find(user,callback){
        console.log(user);
        let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        database.get(sql, [user.username,user.password], (err, row) => {
            if (err) { return console.log(err.message); }
            console.log(row)
            if (typeof row === "undefined") {
                console.log('Utente non trovato!');
                callback(err,false);
            }
            else {
                console.log('Utento trovato!');
                callback(err, { user: row });
            }
        });
    }

    save(callback){
        let sql = "SELECT * FROM users WHERE username = ?";
        database.get(sql, [this.username], (err, row) => {
            if (err) { return console.log(err.message); }
            //console.log(typeof row)
            if (typeof row === "undefined") {
                console.log('Utente non trovato!');
                database.run(`INSERT INTO users(username,password) VALUES(?,?)`, [this.username, this.password], function (err) {
                    if (err) { return console.log(err.message); }
                    console.log(`Utente inserito con rowid ${this.lastID}`);
                    callback(err,{saved:true,row});
                });
            }
            else {
                console.log('Utento trovato!');
                callback(err,{saved:false});
            }
        });
    }
}

module.exports = User