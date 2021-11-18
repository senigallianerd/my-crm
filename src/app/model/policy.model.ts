export class Policy {

    constructor(userId, data, fileName, tipoDoc, sottotipoDoc, frazionamentoSemestrale,targa,note,numero,premioRata) { 
        this.data = data,
        this.userId = userId,
        this.fileName = fileName;
        this.sottotipoDoc = sottotipoDoc;
        this.tipoDoc = tipoDoc;
        this.frazionamentoSemestrale = frazionamentoSemestrale ? true : false;
        this.tipoDoc = targa;
        this.note = note;
        this.numero = numero;
        this.premioRata = premioRata
    }   
    data: Date;
    userId: string;
    fileName: string;
    sottotipoDoc: string;
    tipoDoc: string;
    frazionamentoSemestrale: boolean;
    targa: string;
    note: string;
    numero: string;
    premioRata: string;
}