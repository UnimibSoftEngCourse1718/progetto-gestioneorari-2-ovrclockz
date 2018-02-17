import UserModel from "./User";

export default class SegretarioModel extends UserModel {
    usertype: string;

    constructor(username: string, password: string){
        super(username, password);
        this.usertype = "segretario";
    }
}