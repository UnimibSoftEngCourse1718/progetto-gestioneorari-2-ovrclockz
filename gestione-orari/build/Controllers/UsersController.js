"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./../config/Database");
var User_1 = require("../Models/User");
var Studente_1 = require("../Models/Studente");
var Docente_1 = require("../Models/Docente");
var Segretario_1 = require("../Models/Segretario");
var Users = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.auth = function (request) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    //Renderizza la pagina di autenticazione o la home page dell'area personale
    UsersController.prototype.index = function (request, response) {
        if (this.auth(request)) {
            return response.redirect('/dashboard');
        }
        return response.render('pages/index');
    };
    UsersController.prototype.dashboard = function (request, response) {
        if (this.auth(request)) {
            return response.render('pages/dashboard');
        }
        return response.redirect('/');
    };
    UsersController.prototype.login = function (request, response) {
        if (request.body.username && request.body.password) {
            var username = request.body.username;
            var password = request.body.password;
            User_1.default.authenticate(username, password, function (valid, res) {
                var session = request.session;
                if (!valid) {
                    response.json({ error: true });
                }
                else if (session !== undefined) {
                    session.user = res;
                    response.json({ user: res });
                }
            });
        }
        else {
            response.status(200);
            response.json({ error: true });
        }
    };
    UsersController.prototype.register = function (request, response) {
        if (request.body.username && request.body.password) {
            var usertype_1 = request.body.usertype;
            var username_1 = request.body.username;
            var password_1 = request.body.password;
            User_1.default.find(username_1, function (found) {
                if (found) {
                    console.log("Trovato");
                    response.json({ userExists: true });
                }
                else {
                    console.log("Non trovato");
                    var newuser = Users.getUserType(usertype_1, username_1, password_1);
                    newuser.save(request.body, function (success, row) {
                        if (!success) {
                            console.log("Errore nella registrazione!");
                            return response.status(500).send();
                        }
                        response.json({ success: true });
                    });
                }
            });
        }
        else {
            response.status(200);
            response.json({ error: true });
        }
    };
    UsersController.prototype.getUserData = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                var newuser = Users.getUserType(String(session.user.usertype), session.user.username, session.user.password);
                newuser.getAllData(function (user) {
                    if (user) {
                        return response.json({ user: user });
                    }
                    return response.status(500);
                });
            }
        }
    };
    UsersController.prototype.getPubblicazioni = function (request, response) {
        if (this.auth(request)) {
            User_1.default.getPubblicazioni(function (pubblicazioni) {
                response.json(pubblicazioni);
            });
        }
    };
    UsersController.prototype.getPubblicazioniCorso = function (request, response) {
        if (this.auth(request)) {
            User_1.default.getPubblicazioniCorso(request.body.id_corso, function (pubblicazioni) {
                response.json(pubblicazioni);
            });
        }
    };
    UsersController.prototype.pubblicareNews = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                var newuser = Users.getUserType(String(session.user.usertype), session.user.username, session.user.password);
                console.log(newuser);
                newuser.pubblicareNews(request.body.news, function (stat) {
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
    UsersController.prototype.getListaEsamiAll = function (request, response) {
        if (this.auth(request)) {
            Database_1.default.select('lista_esami_corso.*', 'corsi.nome_corso', 'aule.nome_aula').from('lista_esami_corso')
                .leftJoin('corsi', 'corsi.id', 'lista_esami_corso.id_corso')
                .leftJoin('aule', 'aule.id', 'lista_esami_corso.id_aula')
                .then(function (rows) {
                response.json({ value: rows });
            })
                .catch(function (error) {
                console.log(error);
                response.sendStatus(500);
            });
        }
    };
    UsersController.getUserType = function (usertype, username, password) {
        if (usertype === '3') {
            return new Studente_1.default(username, password);
        }
        else if (usertype === '2') {
            return new Docente_1.default(username, password);
        }
        else if (usertype === '1') {
            return new Segretario_1.default(username, password);
        }
        else {
            return false;
        }
    };
    UsersController.prototype.logout = function (request, response) {
        var session = request.session;
        if (session !== undefined) {
            if (session.user) {
                delete session.user;
            }
        }
        response.redirect('/');
    };
    return UsersController;
}());
exports.default = Users;
