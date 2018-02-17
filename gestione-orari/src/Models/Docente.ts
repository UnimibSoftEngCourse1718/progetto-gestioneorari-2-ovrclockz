import UserModel from "./User";

export default class DocenteModel extends UserModel {
    usertype: string;

    constructor(username: string, password: string){
        super(username, password);
        this.usertype = "docente";
    }
}