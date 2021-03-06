import Database from './../config/Database'
import UserModel from './User';

export default class StudenteModel extends UserModel{
    usertype: number;

    constructor(username: string, password: string) {
        super(username, password);
        this.usertype = 3;
    }

    save(dati: any,callback: Function) {
        console.log("sto inserendo");
        Database('users').insert([{ usertype: this.usertype, username: this.username, password: this.password }])
        .then(function (row) {
            console.log("inserito record in users");
            return(row[0]);
        })
        .then(function(id){
            const matricola = String(id);
            const zeroNum = 6 - matricola.length;
            let newMatricola: string = String(matricola);
            for (let index = 0; index < zeroNum; index++) {
                newMatricola = "0" + newMatricola;
            }
            Database('studenti').insert([{ id_user: id, matricola: newMatricola }]).then(function(row){
                console.log("inserito record in studenti");
                for (let i = 0; i < dati.corsi.length; i++) {
                    if (dati.corsi[i].checked) {
                        Database('lista_corsi_studente').insert([{ id_studente: row[0], id_corso: dati.corsi[i].id }])
                        .then(function (res) {
                            console.log(res)
                            if (i === dati.corsi.length - 1) {
                                callback(true);
                            }
                        }).catch(function (error) { 
                            console.log(error); 
                            callback(false) 
                        })
                    }
                }
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
            const user = { studente : row[0],corsi: []};
            Database.select('lista_corsi_studente.*', 'corsi.*').from('lista_corsi_studente')
            .leftJoin('corsi','corsi.id','lista_corsi_studente.id_corso')
            .where({ 'lista_corsi_studente.id_studente': user.studente.id_studente }).then(function(row){ 
                user.corsi = row;
                return user;
            }).then(function(user: any) {
                for (let index = 0; index < user.corsi.length; index++) {
                    console.log('----------- ' + index);
                    Database.select('lista_orari_corso.*', 'orari.*','aule.nome_aula').from('lista_orari_corso')
                    .leftJoin('orari', 'lista_orari_corso.id_orario', 'orari.id')
                    .leftJoin('aule', 'lista_orari_corso.id_aula', 'aule.id')
                    .where({'lista_orari_corso.id_corso': user.corsi[index].id_corso })
                    .then(function(orari){
                        user.corsi[index].orari = orari;
                        if (index === user.corsi.length - 1){ 
                            callback(user) 
                        }  
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
        const value = !dati.esame.id_esame ? dati.esame.id_esame_real : null;
        Database('lista_corsi_studente')
        .where({ 'id': dati.esame.id, 'id_corso': dati.esame.id_corso, 'id_studente': dati.esame.id_studente})
        .update('id_esame', value)
        .then(function(){
            callback([true,value]);
        })
        .catch(function(error){
            console.log(error)
            callback([false, value]);
        });
    }
}
