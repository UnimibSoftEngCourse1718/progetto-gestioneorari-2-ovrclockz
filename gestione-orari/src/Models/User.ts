import Database from './../config/Database';

export default abstract class UserModel {
    username: string;
    password: string;
    
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    
    static findAll(callback: Function){
        let found: Boolean;
        Database('users').then(function(res){ 
            console.log( res ); 
            callback(res);
        })
    }

    static find(username: string, callback: Function){
        let found: Boolean;
        Database('users').where({
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
        Database('users').where({
            username: username,
            password: password,
        }).then(function (res) {
            console.log(res);
            found = res.length;
            callback(found,res[0]);
        })
    }

    abstract save(callback: Function):void;
    abstract getAllData(callback: Function):void;
} 