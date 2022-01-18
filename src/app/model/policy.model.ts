export class Policy {

    constructor(userId, data, fileName, tipoDoc, sottotipoDoc, frazionamento,targa,note,numero,premioRata,docId) { 
        this.data = data,
        this.userId = userId,
        this.fileName = fileName;
        this.sottotipoDoc = sottotipoDoc;
        this.tipoDoc = tipoDoc;
        this.frazionamento = frazionamento;
        this.tipoDoc = targa;
        this.note = note;
        this.numero = numero;
        this.premioRata = premioRata;
        this.docId = docId
    }   
    data: Date | string;
    userId: string;
    fileName: string;
    sottotipoDoc: string;
    tipoDoc: string;
    frazionamento: string;
    targa: string;
    note: string;
    numero: string;
    premioRata: string;
    docId: string;
}