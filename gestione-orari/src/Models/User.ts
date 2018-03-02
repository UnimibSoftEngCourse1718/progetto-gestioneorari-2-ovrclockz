import Database from './../config/Database';

export default abstract class UserModel {
    username: string;
    password: string;
    
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    
    static findAll(callback: Function){
        Database('users').then(function(res){ 
            console.log( res ); 
            callback(res);
        })
    }

    static find(userName: string, callback: Function){
        let found: boolean;
        Database('users').where({
            username: userName,
        }).then(function(res){ 
            console.log( res ); 
            found = res.length;
            callback(found);
        })
    }

    static authenticate(userName: string, passWord: string, callback: Function){
        let found: boolean;
        Database('users').where({
            username: userName,
            password: passWord,
        }).then(function (res) {
            console.log(res);
            found = res.length;
            callback(found,res[0]);
        })
    }

    static getPubblicazioni(callback: Function){
        Database.select('pubblicazioni.*', 'users.usertype','users.username').from('pubblicazioni')
            .leftJoin('users', 'pubblicazioni.id_user', 'users.id')
            .orderByRaw('pubblicazioni.id DESC')
            .then(function (row) {
            callback(row);
        })
    }
    static getPubblicazioniCorso(idCorso: any,callback: Function){
        Database.select('pubblicazioni.*', 'users.usertype','users.username').from('pubblicazioni')
            .leftJoin('users', 'pubblicazioni.id_user', 'users.id')
            .where({ 'pubblicazioni.id_corso': idCorso })
            .orderByRaw('pubblicazioni.id DESC')
            .then(function (row) {
            callback(row);
        })
    }

    pubblicareNews(dati: any, callback: Function) {
        Database('pubblicazioni').insert([{ id_user: dati.id_user, testo_pubblicazione: dati.content }])
            .then(function (res) {
                console.log(dati);
                callback(true);
            })
            .catch(function (error) {
                console.log(error);
                callback(false);
            })
    }

    abstract save(dati:any,callback: Function):void;
    abstract getAllData(callback: Function):void;
} 
