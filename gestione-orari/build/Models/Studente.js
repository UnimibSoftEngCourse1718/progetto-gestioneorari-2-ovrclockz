"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./../config/Database");
var User_1 = require("./User");
var StudenteModel = /** @class */ (function (_super) {
    __extends(StudenteModel, _super);
    function StudenteModel(username, password) {
        var _this = _super.call(this, username, password) || this;
        _this.usertype = 3;
        return _this;
    }
    StudenteModel.prototype.save = function (dati, callback) {
        console.log("sto inserendo");
        Database_1.default('users').insert([{ usertype: this.usertype, username: this.username, password: this.password }])
            .then(function (row) {
            console.log("inserito record in users");
            return (row[0]);
        })
            .then(function (id) {
            var matricola = String(id);
            var zeroNum = 6 - matricola.length;
            var newMatricola = String(matricola);
            for (var index = 0; index < zeroNum; index++) {
                newMatricola = "0" + newMatricola;
            }
            Database_1.default('studenti').insert([{ id_user: id, matricola: newMatricola }]).then(function (row) {
                console.log("inserito record in studenti");
                var _loop_1 = function (i) {
                    if (dati.corsi[i].checked) {
                        Database_1.default('lista_corsi_studente').insert([{ id_studente: row[0], id_corso: dati.corsi[i].id }])
                            .then(function (res) {
                            console.log(res);
                            if (i === dati.corsi.length - 1) {
                                callback(true);
                            }
                        }).catch(function (error) {
                            console.log(error);
                            callback(false);
                        });
                    }
                };
                for (var i = 0; i < dati.corsi.length; i++) {
                    _loop_1(i);
                }
                callback(true);
            });
        })
            .catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    StudenteModel.prototype.getAllData = function (callback) {
        Database_1.default.select('users.id', 'users.usertype', 'users.username', 'studenti.id as id_studente').from('users')
            .leftJoin('studenti', 'studenti.id_user', 'users.id')
            .where({ 'users.username': this.username })
            .then(function (row) {
            var user = { studente: row[0], corsi: [] };
            Database_1.default.select('lista_corsi_studente.*', 'corsi.*').from('lista_corsi_studente')
                .leftJoin('corsi', 'corsi.id', 'lista_corsi_studente.id_corso')
                .where({ 'lista_corsi_studente.id_studente': user.studente.id_studente }).then(function (row) {
                user.corsi = row;
                return user;
            }).then(function (user) {
                var _loop_2 = function (index) {
                    console.log('----------- ' + index);
                    Database_1.default.select('lista_orari_corso.*', 'orari.*', 'aule.nome_aula').from('lista_orari_corso')
                        .leftJoin('orari', 'lista_orari_corso.id_orario', 'orari.id')
                        .leftJoin('aule', 'lista_orari_corso.id_aula', 'aule.id')
                        .where({ 'lista_orari_corso.id_corso': user.corsi[index].id_corso })
                        .then(function (orari) {
                        user.corsi[index].orari = orari;
                        if (index === user.corsi.length - 1) {
                            callback(user);
                        }
                    });
                };
                for (var index = 0; index < user.corsi.length; index++) {
                    _loop_2(index);
                }
            });
        })
            .catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    StudenteModel.iscrizioneEsame = function (dati, callback) {
        console.log(dati);
        var value = !dati.esame.id_esame ? dati.esame.id_esame_real : null;
        Database_1.default('lista_corsi_studente')
            .where({ 'id': dati.esame.id, 'id_corso': dati.esame.id_corso, 'id_studente': dati.esame.id_studente })
            .update('id_esame', value)
            .then(function () {
            callback([true, value]);
        })
            .catch(function (error) {
            console.log(error);
            callback([false, value]);
        });
    };
    return StudenteModel;
}(User_1.default));
exports.default = StudenteModel;
