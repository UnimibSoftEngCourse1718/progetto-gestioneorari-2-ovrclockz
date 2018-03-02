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
var UsersController_1 = require("./UsersController");
var Database_1 = require("./../config/Database");
var Studente_1 = require("../Models/Studente");
var Studenti = /** @class */ (function (_super) {
    __extends(StudentiController, _super);
    function StudentiController() {
        return _super.call(this) || this;
    }
    StudentiController.prototype.iscrizioneEsame = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Studente_1.default.iscrizioneEsame(request.body, function (res) {
                    if (res[0]) {
                        response.json({ value: res[1] });
                    }
                    else {
                        return response.status(500);
                    }
                });
            }
        }
    };
    StudentiController.prototype.getListaEsamiStudente = function (request, response) {
        if (this.auth(request)) {
            Database_1.default.select('lista_corsi_studente.*', 'corsi.nome_corso', 'lista_esami_corso.data_esame', 'lista_esami_corso.id as id_esame_real', 'aule.nome_aula').from('lista_corsi_studente')
                .leftJoin('corsi', 'corsi.id', 'lista_corsi_studente.id_corso')
                .leftJoin('lista_esami_corso', 'lista_esami_corso.id_corso', 'corsi.id')
                .leftJoin('aule', 'aule.id', 'lista_esami_corso.id_aula')
                .where({ 'lista_corsi_studente.id_studente': request.body.id_studente })
                .then(function (rows) {
                response.json({ value: rows });
            })
                .catch(function (error) {
                console.log(error);
                response.sendStatus(500);
            });
        }
    };
    return StudentiController;
}(UsersController_1.default));
exports.default = Studenti;
