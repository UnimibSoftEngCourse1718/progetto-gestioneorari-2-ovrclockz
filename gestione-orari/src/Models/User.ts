import Database from './../config/Database'

export default abstract class UserModel {
    static db = Database.db;
    usertype: string = "";
    username: string;
    password: string;
    
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    
    static findAll(callback: Function){
        let found: Boolean;
        UserModel.db('users').then(function(res){ 
            console.log( res ); 
            callback(res);
        })
    }

    static find(username: string, callback: Function){
        let found: Boolean;
        UserModel.db('users').where({
            username: username,
        }).then(function(res){ 
            console.log( res ); 
            found = res.length;
            callback(found);
        })
        /*this.db.raw('select * from users').then(function (resp) { console.log(resp);});*/
    }

    static authenticate(username: string, password: string, callback: Function){
        let found: Boolean;
        UserModel.db('users').where({
            username: username,
            password: password,
        }).then(function (res) {
            console.log(res);
            found = res.length;
            callback(found,res[0]);
        })
    }

    save(callback: Function) {
        console.log("sto inserendo")
        UserModel.db('users').insert({ usertype: this.usertype, username: this.username, password: this.password }).then(function () {
            console.log("Creata tabella users");
            callback(true);
        }).catch(function (error) {
            console.log(error);
            callback(false);
        });
    }

    static createTable(){
        UserModel.db.schema.createTableIfNotExists('users', function (table) {
            table.string('usertype');
            table.string('username');
            table.string('password');
        }).then(function (res) {
            console.log("Tabella users creata");
            //console.log(res);
        });
    }

} 