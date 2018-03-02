"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./../config/Database");
var UserModel = /** @class */ (function () {
    function UserModel(username, password) {
        this.username = username;
        this.password = password;
    }
    UserModel.findAll = function (callback) {
        Database_1.default('users').then(function (res) {
            console.log(res);
            callback(res);
        });
    };
    UserModel.find = function (userName, callback) {
        var found;
        Database_1.default('users').where({
            username: userName,
        }).then(function (res) {
            console.log(res);
            found = res.length;
            callback(found);
        });
    };
    UserModel.authenticate = function (userName, passWord, callback) {
        var found;
        Database_1.default('users').where({
            username: userName,
            password: passWord,
        }).then(function (res) {
            console.log(res);
            found = res.length;
            callback(found, res[0]);
        });
    };
    UserModel.getPubblicazioni = function (callback) {
        Database_1.default.select('pubblicazioni.*', 'users.usertype', 'users.username').from('pubblicazioni')
            .leftJoin('users', 'pubblicazioni.id_user', 'users.id')
            .orderByRaw('pubblicazioni.id DESC')
            .then(function (row) {
            callback(row);
        });
    };
    UserModel.getPubblicazioniCorso = function (idCorso, callback) {
        Database_1.default.select('pubblicazioni.*', 'users.usertype', 'users.username').from('pubblicazioni')
            .leftJoin('users', 'pubblicazioni.id_user', 'users.id')
            .where({ 'pubblicazioni.id_corso': idCorso })
            .orderByRaw('pubblicazioni.id DESC')
            .then(function (row) {
            callback(row);
        });
    };
    UserModel.prototype.pubblicareNews = function (dati, callback) {
        Database_1.default('pubblicazioni').insert([{ id_user: dati.id_user, testo_pubblicazione: dati.content }])
            .then(function (res) {
            console.log(dati);
            callback(true);
        })
            .catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    return UserModel;
}());
exports.default = UserModel;
