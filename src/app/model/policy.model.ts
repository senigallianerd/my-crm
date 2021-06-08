export class Policy {

    constructor(userId, data, fileName, tipoDoc, sottotipoDoc) { 
        this.data = data,
        this.userId = userId,
        this.fileName = fileName;
        this.sottotipoDoc = sottotipoDoc;
        this.tipoDoc = tipoDoc;
    }   

    data: Date;
    userId: string;
    fileName: string;
    sottotipoDoc: string;
    tipoDoc: string;
}