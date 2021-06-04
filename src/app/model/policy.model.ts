export class Policy {

    constructor(insuranceId, userId, scadenzaAnnuale, fileName, compagnia) { 
        this.scadenzaAnnuale = scadenzaAnnuale,
        this.userId = userId,
        this.insuranceId = insuranceId,
        this.fileName = fileName;
        this.compagnia = compagnia;
    }   

    scadenzaAnnuale: Date;
    userId: string;
    insuranceId: string;
    fileName: string;
    compagnia: string;
}