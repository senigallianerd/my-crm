export class Policy {

    constructor(insuranceId, userId, scadenzaAnnuale, fileName, compagnia, tipo) { 
        this.scadenzaAnnuale = scadenzaAnnuale,
        this.userId = userId,
        this.insuranceId = insuranceId,
        this.fileName = fileName;
        this.compagnia = compagnia;
        this.tipo = tipo;
    }   

    scadenzaAnnuale: Date;
    userId: string;
    insuranceId: string;
    fileName: string;
    compagnia: string;
    tipo: string;
}