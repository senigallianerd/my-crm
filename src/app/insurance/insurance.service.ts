import { Injectable } from '@angular/core';

@Injectable()
export class InsuranceService {

    private compagnie = ['UniPol', 'Generali', 'Allianz'];;
    private rami = ['Auto', 'Scooter', 'Vita'];

    constructor() { }

    getRami() {
        return this.rami;
    }

    getCompagnie() {
        return this.compagnie;
    }

}
