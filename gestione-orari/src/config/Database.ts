import * as knex from 'knex';

class Database {
    db: knex;

    constructor() {
        this.db = knex({
            dialect: 'sqlite3',
            connection: {
                filename: __dirname + '/database.sqlite'
            },
            useNullAsDefault: true
        });
    }
}

export default new Database();