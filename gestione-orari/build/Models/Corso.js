"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./../config/Database");
var CorsoModel = /** @class */ (function () {
    function CorsoModel(name) {
        this.name = name;
    }
    CorsoModel.prototype.findCorso = function (id, callback) {
        CorsoModel.db('corsi').where({
            id: id,
        }).then(function (res) {
            console.log(res);
            callback(res);
        });
    };
    CorsoModel.createTable = function () {
        CorsoModel.db.schema.createTableIfNotExists('corsi', function (table) {
            table.string('name');
        }).then(function (res) {
            console.log("Tabella corsi creata");
            //console.log(res);
        });
    };
    CorsoModel.db = Database_1.default.db;
    return CorsoModel;
}());
exports.default = CorsoModel;
