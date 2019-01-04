//omportando Ng par crear modulos y el router para crear las rutas
import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { IsLoggedGuard } from '../../services/guards/islogged.guard';

// componenetes
import { PuestoViewComponent } from './components/puesto-view.component';
import { PuestoEditComponent } from './components/puesto-edit.component';
import { PuestoStoreComponent } from './components/puesto-store.component';
import { PuestoMainComponent } from './components/puesto-main.component';

const puestosRoutes: Routes = [
    {
        path: 'puestos', component:PuestoMainComponent ,canActivateChild:[IsLoggedGuard],
                                                         children:[
                                                            { path:'list', component: PuestoViewComponent}, 
                                                            { path:'nuevo', component: PuestoStoreComponent},
                                                            { path:'edit/:id', component: PuestoEditComponent},
                                                            { path: '', redirectTo: 'list', pathMatch: 'full' }
                                                        ]
    }
]

@NgModule({
  imports: [
      RouterModule.forChild(puestosRoutes)
  ],
  exports: [
      RouterModule
  ]
})

export class PuestosRoutingModule {}
