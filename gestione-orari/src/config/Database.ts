import * as knex from 'knex';

let Database = knex({
    dialect: 'sqlite3',
    connection: {
        filename: __dirname + '/database.sqlite'
    },
    useNullAsDefault: true
});

export default Database;