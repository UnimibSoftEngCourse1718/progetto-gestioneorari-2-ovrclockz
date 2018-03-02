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
var Docente_1 = require("../Models/Docente");
var Docenti = /** @class */ (function (_super) {
    __extends(DocenteController, _super);
    function DocenteController() {
        return _super.call(this) || this;
    }
    DocenteController.prototype.prenotazioneRisorsa = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                new Docente_1.default(session.user.username, session.user.password).prenotazioneRisorsa(request.body.risorsa, function (res) {
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
    DocenteController.prototype.cancellarePrenotazione = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database_1.default('lista_prenotazioni_risorse')
                    .where('id', request.body.risorsa.id)
                    .del()
                    .then(function (res) {
                    console.log(res);
                    response.json({ value: res });
                })
                    .catch(function () {
                    return response.status(500).send();
                });
            }
        }
    };
    DocenteController.prototype.getListaRisorse = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                new Docente_1.default(session.user.username, session.user.password).getListaRisorse(function (res) {
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
    DocenteController.prototype.getListaRisorsePrenotate = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                console.log(request.body);
                new Docente_1.default(session.user.username, session.user.password).getListaRisorsePrenotate(request.body.id_docente, function (res) {
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
    DocenteController.prototype.pubblicareNewsCorso = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                var newuser = UsersController_1.default.getUserType(String(session.user.usertype), session.user.username, session.user.password);
                console.log(newuser);
                newuser.pubblicareNewsCorso(request.body.id_corso, request.body.news, function (stat) {
                    if (stat) {
                        response.json({ status: stat });
                    }
                    else {
                        return response.status(500).send();
                    }
                });
            }
        }
    };
    return DocenteController;
}(UsersController_1.default));
exports.default = Docenti;
