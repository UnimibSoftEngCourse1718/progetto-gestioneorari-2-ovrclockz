import Database from './../config/Database'
import UserModel from './User';

export default class DocenteModel extends UserModel{
    usertype: number;

    constructor(username: string, password: string) {
        super(username, password);
        this.usertype = 2;
    }

    save(callback: Function) {
        let username = this.username;
        console.log("sto inserendo")
        Database('users').insert([{ usertype: this.usertype, username: this.username, password: this.password }])
        .then(function rows(row) {
            console.log("inserito record in users");
            Database('docenti').insert([{ id_user: row[0] }]).then(function () {
                console.log("inserito record in docenti");
                callback(true);
            });
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }

    getAllData(callback: Function) {
        Database.select('users.id', 'users.usertype', 'users.username').from('users')
        .where({ 'users.username': this.username })
        .then(function (row) {
            let user = { docente: row[0], corsi: {} };
            Database.select('lista_corsi_docente.*', 'corsi.*').from('lista_corsi_docente')
                .join('corsi', 'corsi.id', 'lista_corsi_docente.id_corso')
                .where({ 'lista_corsi_docente.id_docente': user.docente.id }).then(function (row) {
                    user.corsi = row;
                    console.log(user);
                    callback(user);
                })
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }
} 