let database = require('../config/database')

class User {

    constructor(){
        database.run("CREATE TABLE IF NOT EXISTS users (username STRING, password STRING)")
    }

    static register(user, callback){
        database.serialize(() => {
            let query = "SELECT * FROM users WHERE username = ?";
            database.run(`INSERT INTO users(username,password) VALUES(?,?)`, [user.username, user.password], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        })
        callback();
    }

    static getUser(username,callback){
        let sql = "SELECT username FROM users WHERE username = ?"
        database.get(sql, [username], (err, row) => {
            callback(row);
        });
    }
    
    static login(user,callback){

    }
}

module.exports = User