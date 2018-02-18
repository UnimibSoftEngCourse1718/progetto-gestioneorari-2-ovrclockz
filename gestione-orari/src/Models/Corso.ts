import Database from './../config/Database';

export default class CorsoModel{
    static db = Database.db;
    name: string;

    constructor(name: string){
        this.name = name;
    }

    findCorso(id: number,callback: Function){
        CorsoModel.db('corsi').where({
            id: id,
        }).then(function (res) {
            console.log(res);
            callback(res);
        })
    }

    static createTable() {
        CorsoModel.db.schema.createTableIfNotExists('corsi', function (table) {
            table.string('name');
        }).then(function (res) {
            console.log("Tabella corsi creata");
            //console.log(res);
        });
    }
}