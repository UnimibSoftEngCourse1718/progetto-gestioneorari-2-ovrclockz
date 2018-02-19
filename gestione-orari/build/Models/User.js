"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./../config/Database");
var UserModel = /** @class */ (function () {
    function UserModel(username, password) {
        this.usertype = "";
        this.username = username;
        this.password = password;
    }
    UserModel.findAll = function (callback) {
        var found;
        Database_1.default('users').then(function (res) {
            console.log(res);
            callback(res);
        });
    };
    UserModel.find = function (username, callback) {
        var found;
        Database_1.default('users').where({
            username: username,
        }).then(function (res) {
            console.log(res);
            found = res.length;
            callback(found);
        });
        /*this.db.raw('select * from users').then(function (resp) { console.log(resp);});*/
    };
    UserModel.authenticate = function (username, password, callback) {
        var found;
        Database_1.default('users').where({
            username: username,
            password: password,
        }).then(function (res) {
            console.log(res);
            found = res.length;
            callback(found, res[0]);
        });
    };
    UserModel.prototype.save = function (callback) {
        console.log("sto inserendo");
        Database_1.default('users').insert({ usertype: this.usertype, username: this.username, password: this.password }).then(function () {
            console.log("Creata tabella users");
            callback(true);
        }).catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    return UserModel;
}());
exports.default = UserModel;
