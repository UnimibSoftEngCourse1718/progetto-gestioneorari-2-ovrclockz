import Database from './../config/Database'
import UserModel from './User';

export default class StudenteModel extends UserModel{
    usertype: number;

    constructor(username: string, password: string) {
        super(username, password);
        this.usertype = 3;
    }

    save(callback: Function) {
        let username = this.username;
        console.log("sto inserendo");
        Database('users').insert([{ usertype: this.usertype, username: this.username, password: this.password }])
        .then(function (row) {
            console.log("inserito record in users");
            let matricola = String(row[0]);
            let zeroNum = 6 - matricola.length;
            let newMatricola: String = String(matricola);
            for (let index = 0; index < zeroNum; index++) {
                newMatricola = "0" + newMatricola;
            }
            //console.log('zeroNum', zeroNum)
            //console.log('matricola', newMatricola)
            Database('studenti').insert([{ id_user: row[0], matricola: newMatricola }]).then(function(){
                console.log("inserito record in studenti");
                callback(true);
            });
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }

    getAllData(){
        //console.log("qwefwr");
    }
}