import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class PersonalUtil {
    /* 
        ============================================================ 
        Metodo para desdoblar el Json de los Hijos seleccionados
                            y agregarles su nivel
        ============================================================ 
    */
    private familiTree(family: Array<any>, level: number) {
        let res: Array<any> = [];
        Object.entries(family).forEach(([key, value]) => {
            if (key != 'status' && key != 'code') {
                if (value.familia.length > 0) {
                    value.level = level + 1;
                    let item = this.familiTree(value.familia, value.level);
                    res.push(value);
                    for (let i of item) {
                        res.push(i);
                    }
                } else {
                    value.level = level
                    res.push(value);
                }
            }
        });
        return res;
    }

    /** Metodo para desdoblar el Json de los Hijos seleccionados */
    public getFamilia(amily: Array<any>) {
        return this.familiTree(amily, -1);
    }

}// End Class