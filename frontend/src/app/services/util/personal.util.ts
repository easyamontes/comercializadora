import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class PersonalUtil {
    /* 
        ============================================================ 
        Metodo para desdoblar el Json de los Hijos seleccionados
        ============================================================ 
    */
    private familiTree(family: Array<any>) {
        let res: Array<any> = [];
        Object.entries(family).forEach(([key, value]) => {
            if (key != 'status' && key != 'code') {
                if (value.familia.length > 0) {
                    let item = this.familiTree(value.familia);
                    res.push(value);
                    for (let i of item) {
                        res.push(i);
                    }
                } else {
                    res.push(value);
                }
            }
        });
        return res;
    }
    /** Metodo para desdoblar el Json de los Hijos seleccionados */
    public getFamilia(amily: Array<any>) {
        return this.familiTree(amily);
    }
}// End Class