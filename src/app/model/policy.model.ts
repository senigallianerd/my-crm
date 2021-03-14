export class Policy {

    constructor(insuranceId, userId, expirationDate, fileName) { 
        this.expirationDate = expirationDate,
        this.userId = userId,
        this.insuranceId = insuranceId,
        this.fileName = fileName;
    }   

    expirationDate: Date;
    userId: string;
    insuranceId: string;
    fileName: string;
}