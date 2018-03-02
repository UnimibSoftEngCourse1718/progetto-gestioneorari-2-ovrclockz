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
var UsersController_1 = require("./UsersController");
var User_1 = require("../Models/User");
var Segretario_1 = require("../Models/Segretario");
var Docente_1 = require("../Models/Docente");
var Segretari = /** @class */ (function (_super) {
    __extends(SegretariController, _super);
    function SegretariController() {
        return _super.call(this) || this;
    }
    SegretariController.prototype.getListaRisorse = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                new Segretario_1.default(session.user.username, session.user.password).getListaRisorse(function (res) {
                    if (res[0]) {
                        response.json({ value: res[1] });
                    }
                    else {
                        return response.status(500).send();
                    }
                });
            }
        }
    };
    SegretariController.prototype.getListaCorsi = function (request, response) {
        Database_1.default.select('*').from('corsi')
            .then(function (row) {
            console.log(row);
            return response.json({ value: row });
        })
            .catch(function (error) {
            console.log(error);
            return response.sendStatus(500);
        });
    };
    SegretariController.prototype.inserireOrario = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database_1.default('lista_orari_corso').insert([{ id_corso: request.body.dati.id_corso, id_aula: request.body.dati.id_aula, id_orario: request.body.dati.id_orario }])
                    .then(function (res) {
                    console.log(res);
                    return response.json({ status: true });
                })
                    .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                });
            }
        }
    };
    SegretariController.prototype.inserireRisorsa = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database_1.default('risorse').insert([{ nome_risorsa: request.body.nome_risorsa }])
                    .then(function (res) {
                    console.log(res);
                    return response.json({ status: true });
                })
                    .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                });
            }
        }
    };
    SegretariController.prototype.inserireEsame = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database_1.default.select('*').from('lista_esami_corso').where({
                    id_aula: request.body.esame.id_aula,
                    data_esame: request.body.esame.data_esame
                })
                    .then(function (row) {
                    console.log(row);
                    if (!row.length) {
                        Database_1.default('lista_esami_corso').insert([{ id_corso: request.body.esame.id_corso, id_aula: request.body.esame.id_aula,
                                data_esame: request.body.esame.data_esame }])
                            .then(function (res) {
                            console.log(res);
                            return response.json({ status: true });
                        });
                    }
                    else {
                        return response.json({ status: false });
                    }
                })
                    .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                });
            }
        }
    };
    SegretariController.prototype.inserireDocente = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                User_1.default.find(request.body.username, function (found) {
                    if (!found) {
                        new Docente_1.default(request.body.username, request.body.password).inserireDocente(request.body, function (stat) {
                            if (stat) {
                                response.send({ status: stat });
                            }
                            else {
                                return response.send(500);
                            }
                        });
                    }
                    else {
                        return response.json({ status: false });
                    }
                });
            }
        }
    };
    SegretariController.prototype.getListaDocenti = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database_1.default.select('*').from('docenti')
                    .leftJoin('users', 'users.id', 'docenti.id_user')
                    .then(function (row) {
                    console.log(row);
                    return response.json({ value: row });
                })
                    .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                });
            }
        }
    };
    SegretariController.prototype.getListaOrariDisponibili = function (request, response) {
        var session = request.session;
        var id_aula = request.body.id_aula;
        if (session !== undefined) {
            if (session.user) {
                Database_1.default.select('*').from('orari')
                    .whereRaw("id not in (SELECT id_orario FROM lista_orari_corso WHERE id_aula = ?)", [id_aula])
                    .then(function (row) {
                    console.log(row);
                    return response.json({ value: row });
                })
                    .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                });
            }
        }
    };
    SegretariController.prototype.getListaAule = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database_1.default.select('*').from('aule')
                    .then(function (row) {
                    console.log(row);
                    return response.json({ value: row });
                })
                    .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                });
            }
        }
    };
    return SegretariController;
}(UsersController_1.default));
exports.default = Segretari;
