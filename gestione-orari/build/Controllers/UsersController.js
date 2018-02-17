"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../Models/User");
var Studente_1 = require("../Models/Studente");
var Docente_1 = require("../Models/Docente");
var Segretario_1 = require("../Models/Segretario");
var UsersController = /** @class */ (function () {
    function UsersController() {
        User_1.default.createTable();
    }
    UsersController.prototype.index = function (request, response) {
        var session = request.session;
        //console.log(request.session);
        if (session !== undefined) {
            if (session.user) {
                return response.redirect('/dashboard');
            }
        }
        return response.render('pages/index');
    };
    UsersController.prototype.dashboard = function (request, response) {
        var session = request.session;
        //console.log(request.session);
        if (session !== undefined) {
            if (session.user) {
                return response.render('pages/dashboard');
            }
        }
        return response.redirect('/');
    };
    UsersController.prototype.login = function (request, response) {
        if (request.body.username && request.body.password) {
            var username = request.body.username;
            var password = request.body.password;
            User_1.default.authenticate(username, password, function (valid, res) {
                //if (err) { console.log(err); return response.status(500).send(); }
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
                    var newuser = void 0;
                    switch (usertype_1) {
                        case '3':
                            newuser = new Studente_1.default(username_1, password_1);
                            newuser.save(function (success) {
                                if (!success) {
                                    console.log("Errore nella registrazione!");
                                    return response.status(500).send();
                                }
                                response.json({ success: true });
                            });
                            break;
                        case "2":
                            newuser = new Docente_1.default(username_1, password_1);
                            newuser.save(function (success) {
                                if (!success) {
                                    console.log("Errore nella registrazione!");
                                    return response.status(500).send();
                                }
                                response.json({ success: true });
                            });
                            break;
                        case "1":
                            newuser = new Segretario_1.default(username_1, password_1);
                            newuser.save(function (success) {
                                if (!success) {
                                    console.log("Errore nella registrazione!");
                                    return response.status(500).send();
                                }
                                response.json({ success: true });
                            });
                            break;
                        default:
                            response.json({ error: true });
                            break;
                    }
                }
            });
        }
        else {
            response.status(200);
            response.json({ error: true });
        }
    };
    return UsersController;
}());
exports.default = new UsersController();
