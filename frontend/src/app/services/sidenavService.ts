import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()

export class SidenavService {
    private snav: MatSidenav;

    public setSidenav(snav: MatSidenav) {
        this.snav = snav;
    }

    public open() {
        return this.snav.open();
    }


    public close() {
        return this.snav.close();
    }

    public toggle(): void {
    this.snav.toggle();
   }


}