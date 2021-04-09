import { Injectable } from '@angular/core';

@Injectable()
export class InsuranceService {

    private compagnie = ['compagnia1', 'compagnia2', 'compagnia3'];;
    private rami = ['ramo1', 'ramo2', 'ramo3'];

    constructor() { }

    getRami() {
        return this.rami;
    }

    getCompagnie() {
        return this.compagnie;
    }

}
