import DocenteModel from "../Models/Docente";

export default interface RisorsaInterface{
    name: string;
    prenotata: Boolean;

    prenota(prof: DocenteModel):Boolean;
}