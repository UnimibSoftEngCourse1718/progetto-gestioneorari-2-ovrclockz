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
var DocenteModel = /** @class */ (function (_super) {
    __extends(DocenteModel, _super);
    function DocenteModel(username, password) {
        var _this = _super.call(this, username, password) || this;
        _this.usertype = 2;
        return _this;
    }
    DocenteModel.prototype.save = function (dati, callback) {
        console.log("sto inserendo");
        Database_1.default('users').insert([{ usertype: this.usertype, username: this.username, password: this.password }])
            .then(function rows(row) {
            console.log("inserito record in users");
            Database_1.default('docenti').insert([{ id_user: row[0] }]).then(function (row) {
                console.log("inserito record in docenti");
                var _loop_1 = function (i) {
                    if (dati.corsi[i].checked) {
                        Database_1.default('lista_corsi_docente').insert([{ id_docente: row[0], id_corso: dati.corsi[i].id }])
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
            });
        })
            .catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    DocenteModel.prototype.getAllData = function (callback) {
        Database_1.default.select('users.id', 'users.usertype', 'users.username', 'docenti.id as id_docente').from('users')
            .leftJoin('docenti', 'docenti.id_user', 'users.id')
            .where({ 'users.username': this.username })
            .then(function (row) {
            var user = { docente: row[0], corsi: {} };
            Database_1.default.select('lista_corsi_docente.*', 'corsi.*').from('lista_corsi_docente')
                .leftJoin('corsi', 'corsi.id', 'lista_corsi_docente.id_corso')
                .where({ 'lista_corsi_docente.id_docente': user.docente.id_docente }).
                then(function (row) {
                user.corsi = row;
                console.log(user);
                return user;
            })
                .then(function (user) {
                if (user.corsi.length) {
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
                }
                else {
                    callback(user);
                }
            });
        })
            .catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    DocenteModel.prototype.prenotazioneRisorsa = function (dati, callback) {
        Database_1.default.select('*').from('lista_prenotazioni_risorse')
            .where({ 'id_risorsa': dati.id, 'data_prenotazione': dati.giorno_richiesta_prenotazione, 'orario_prenotazione': dati.orario_richiesta_prenotazione })
            .then(function (res) {
            console.log(res);
            if (res.length) {
                callback([true, false]);
            }
            else {
                Database_1.default('lista_prenotazioni_risorse').insert([{
                        id_risorsa: dati.id, id_docente: dati.id_docente, data_prenotazione: dati.giorno_richiesta_prenotazione,
                        orario_prenotazione: dati.orario_richiesta_prenotazione
                    }])
                    .then(function (res) {
                    callback([true, true]);
                });
            }
        });
    };
    DocenteModel.prototype.getListaRisorse = function (callback) {
        Database_1.default.select('*').from('risorse').orderByRaw('id DESC')
            .then(function (row) {
            callback([true, row]);
        })
            .catch(function (error) {
            console.log(error);
            callback([false]);
        });
    };
    DocenteModel.prototype.getListaRisorsePrenotate = function (idDocente, callback) {
        Database_1.default.select('lista_prenotazioni_risorse.*', 'risorse.nome_risorsa')
            .from('lista_prenotazioni_risorse')
            .leftJoin('risorse', 'lista_prenotazioni_risorse.id_risorsa', 'risorse.id')
            .where("lista_prenotazioni_risorse.id_docente", idDocente).orderByRaw('lista_prenotazioni_risorse.id DESC')
            .then(function (row) {
            callback([true, row]);
        })
            .catch(function (error) {
            console.log(error);
            callback([false]);
        });
    };
    DocenteModel.prototype.pubblicareNewsCorso = function (idCorso, dati, callback) {
        Database_1.default('pubblicazioni').insert([{ id_user: dati.id_user, id_corso: idCorso, testo_pubblicazione: dati.content }])
            .then(function (res) {
            console.log(dati);
            callback(true);
        })
            .catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    DocenteModel.prototype.inserireDocente = function (dati, callback) {
        Database_1.default('users').insert([{ username: dati.username, password: dati.password, usertype: 2 }])
            .then(function (res) {
            console.log(res);
            Database_1.default('docenti').insert([{ id_user: res[0] }])
                .then(function (res) {
                console.log(res);
                if (dati.corsi.length) {
                    var _loop_3 = function (i) {
                        Database_1.default('lista_corsi_docente').insert([{ id_docente: res[0], id_corso: dati.corsi[i].id }])
                            .then(function (ret) {
                            console.log(ret);
                            if (i === dati.corsi.length - 1) {
                                callback(true);
                            }
                        });
                    };
                    for (var i = 0; i < dati.corsi.length; i++) {
                        _loop_3(i);
                    }
                }
                else {
                    return callback(true);
                }
            })
                .catch(function (error) {
                console.log(error);
                callback(false);
            });
        });
    };
    return DocenteModel;
}(User_1.default));
exports.default = DocenteModel;
