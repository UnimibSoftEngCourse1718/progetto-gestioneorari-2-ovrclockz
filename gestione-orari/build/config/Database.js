"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("knex");
var Database = knex({
    dialect: 'sqlite3',
    connection: {
        filename: __dirname + '/database.sqlite'
    },
    useNullAsDefault: true
});
exports.default = Database;
