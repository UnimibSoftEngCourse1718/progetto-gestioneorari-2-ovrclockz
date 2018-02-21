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
                .leftJoin('corsi', 'corsi.id', 'lista_corsi_docente.id_corso')
                .where({ 'lista_corsi_docente.id_docente': user.docente.id }).then(function (row) {
                    user.corsi = row;
                    console.log(user);
                    return user;
                })
                .then(function (user: any) {
                    for (let index = 0; index < user.corsi.length; index++) {
                        console.log('----------- ' + index);
                        Database.select('lista_orari_corso.*', 'orari.*').from('lista_orari_corso')
                        .leftJoin('orari', 'lista_orari_corso.id_orario', 'orari.id')
                        .where({ 'lista_orari_corso.id_corso': user.corsi[index].id_corso })
                        .then(function (orari) {
                            user.corsi[index].orari = orari;
                            //console.log(user);
                            if (index === user.corsi.length - 1) { callback(user) }
                        })
                    }
                })
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }

    prenotazioneRisorsa(dati: any,callback: Function){
       Database.select('*').from('lista_prenotazioni_risorse')
        .where({ 'id_risorsa': dati.id, 'data_prenotazione': dati.giorno_richiesta_prenotazione, 'orario_prenotazione': dati.orario_richiesta_prenotazione})
        .then(function(res){
            console.log(res);
            if(res.length){
                callback([true,false]);
            }else{
                Database('lista_prenotazioni_risorse').insert([{ id_risorsa: dati.id, id_docente : dati.id_docente , data_prenotazione: dati.giorno_richiesta_prenotazione, orario_prenotazione: dati.orario_richiesta_prenotazione }])
                .then(function(res){
                    callback([true,true])
                })
            }
        })
    }

    getListaRisorse(callback: Function){
        Database.select('*').from('risorse')
        .then(function (row) {
            //console.log(row);
            callback([true,row]);
        })
        .catch(function(error){
            console.log(error);
            callback([false]);
        })
    }

    pubblicareNews(dati: any, callback: Function) {
        Database('pubblicazioni').insert([{ id_user: dati.id_user, testo_pubblicazione: dati.content }])
        .then(function (res) {
                console.log(dati);
                callback([true]);
            })
            .catch(function (error) {
                console.log(error);
                callback([false]);
            })
    }
} 