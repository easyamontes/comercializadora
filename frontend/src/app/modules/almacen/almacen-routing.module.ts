import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//components
import { AlmacenMainComponent } from './components/main.component';
import { ExistenciaViewComponent } from './components/existencia/listview.component'
import { RequisicionViewComponent } from './components/requisiciones/view.component';
import { RequisicionStoreComponent } from './components/requisiciones/store.component';
import { AlmacenDefaultComponent } from './components/default/default.component';
import { RequisicionReciveComponent } from './components/requisiciones/recive.component';
import { DiarioViewComponent } from './components/reporteDiario/view.component';
import { CobranzaViewComponent } from './components/cuentasPC/viewCobrar.component';
import { PagoProveedoresViewComponent } from './components/pagoProveedores/view.component';
import { ResultadosViewComponent } from './components/cuentasPC/viewResultados.component';
import {RequisicionPendienteComponent } from './components/requisiciones/pendiente.component';
import {RequisicionTraspasoComponent } from './components/requisiciones/traspaso.component';
const almacenRoutes: Routes =[
    {
        path:'almacen', component:AlmacenMainComponent, canActivateChild:[IsLoggedGuard],
                                                         children:[
                                                            { path:'',redirectTo:'welcome', pathMatch:'full' },
                                                            { path:'welcome', component:AlmacenDefaultComponent },
                                                            { path:'list',component:ExistenciaViewComponent },
                                                            { path:'requisicions',component:RequisicionViewComponent },
                                                            { path:'equinueva',component:RequisicionStoreComponent },
                                                            { path:'equinueva/:sure',component:RequisicionStoreComponent },
                                                            { path:'recepcion/:sure',component:RequisicionReciveComponent},
                                                            { path:'diario',component:DiarioViewComponent },
                                                            { path:'cx/:tip' ,component:CobranzaViewComponent},
                                                            { path:'pp', component:PagoProveedoresViewComponent },
                                                            { path:'res', component:ResultadosViewComponent },
                                                            { path:'pendiente', component:RequisicionPendienteComponent },
                                                            { path:'traspaso', component:RequisicionTraspasoComponent },
                                                            
                                                            
                                                         ]
    }
]
@NgModule({
   imports:
   [
     RouterModule.forChild(almacenRoutes)
   ],
  exports:
  [
    RouterModule
  ]
})

export class AlmacenRoutingModule {}
