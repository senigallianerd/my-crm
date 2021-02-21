export class Policy {

    constructor(type, userId, expirationDate, fileName) { 
        this.expirationDate = expirationDate,
        this.userId = userId,
        this.type = type,
        this.fileName = fileName;
    }   

    expirationDate: Date;
    userId: string;
    type: string;
    fileName: string;
}