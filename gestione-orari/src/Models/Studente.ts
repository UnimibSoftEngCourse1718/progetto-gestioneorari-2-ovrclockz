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
            return(row[0]);
        })
        .then(function(id){
            let matricola = String(id);
            let zeroNum = 6 - matricola.length;
            let newMatricola: String = String(matricola);
            for (let index = 0; index < zeroNum; index++) {
                newMatricola = "0" + newMatricola;
            }
            //console.log('zeroNum', zeroNum)
            //console.log('matricola', newMatricola)
            Database('studenti').insert([{ id_user: id, matricola: newMatricola }]).then(function(row){
                console.log("inserito record in studenti");
                callback(true);
            });
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }

    getAllData(callback: Function){
        Database.select('users.id', 'users.usertype', 'users.username','studenti.id as id_studente').from('users')
        .leftJoin('studenti', 'studenti.id_user', 'users.id')
        .where({'users.username': this.username})
        .then(function(row){
            let user = { studente : row[0],corsi: []};
            Database.select('lista_corsi_studente.*', 'corsi.*').from('lista_corsi_studente')
            .leftJoin('corsi','corsi.id','lista_corsi_studente.id_corso')
            .where({ 'lista_corsi_studente.id_studente': user.studente.id_studente }).then(function(row){ 
                user.corsi = row;
                //console.log(user);
                return user;
            }).then(function(user: any) {
                for (let index = 0; index < user.corsi.length; index++) {
                    console.log('----------- ' + index);
                    Database.select('lista_orari_corso.*', 'orari.*').from('lista_orari_corso')
                    .leftJoin('orari', 'lista_orari_corso.id_orario', 'orari.id')
                    .where({'lista_orari_corso.id_corso': user.corsi[index].id_corso })
                    .then(function(orari){
                        user.corsi[index].orari = orari;
                        //console.log(user);
                        if (index === user.corsi.length - 1){ callback(user) }  
                    })
                }                           
            })
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }

    static iscrizioneEsame(dati: any,callback: Function){
        console.log(dati);
        let value = dati.corso.studente_iscritto_esame ? 0 : 1;
        Database('lista_corsi_studente')
        .where({ 'id_corso': dati.corso.id_corso, 'id_studente': dati.corso.id_studente})
        .update('studente_iscritto_esame', value)
        .then(function(){
            callback([true,value]);
        })
        .catch(function(error){
            console.log(error)
            callback([false, value]);
        });
    }
}