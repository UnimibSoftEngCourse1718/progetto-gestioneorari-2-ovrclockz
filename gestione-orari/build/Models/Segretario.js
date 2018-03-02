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
var SegretarioModel = /** @class */ (function (_super) {
    __extends(SegretarioModel, _super);
    function SegretarioModel(username, password) {
        var _this = _super.call(this, username, password) || this;
        _this.usertype = 1;
        return _this;
    }
    SegretarioModel.prototype.save = function (dati, callback) {
        console.log("sto inserendo");
        Database_1.default('users').insert([{ usertype: this.usertype, username: this.username, password: this.password }])
            .then(function rows(row) {
            console.log("inserito record in users");
            Database_1.default('segretari').insert([{ id_user: row[0] }]).then(function () {
                console.log("inserito record in segretari");
                callback(true);
            });
        })
            .catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    SegretarioModel.prototype.getAllData = function (callback) {
        Database_1.default.select('users.id', 'users.usertype', 'users.username').from('users')
            .where({ 'users.username': this.username })
            .then(function (row) {
            var user = { segretario: row[0] };
            callback(user);
        })
            .catch(function (error) {
            console.log(error);
            callback(false);
        });
    };
    SegretarioModel.prototype.getListaRisorse = function (callback) {
        Database_1.default.select('*').from('risorse').orderByRaw('id DESC')
            .then(function (row) {
            callback([true, row]);
        })
            .catch(function (error) {
            console.log(error);
            callback([false]);
        });
    };
    return SegretarioModel;
}(User_1.default));
exports.default = SegretarioModel;
