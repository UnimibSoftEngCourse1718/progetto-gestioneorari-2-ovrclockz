"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("knex");
var Database = /** @class */ (function () {
    function Database() {
        this.db = knex({
            dialect: 'sqlite3',
            connection: {
                filename: __dirname + '/database.sqlite'
            },
            useNullAsDefault: true
        });
    }
    return Database;
}());
exports.default = new Database();
