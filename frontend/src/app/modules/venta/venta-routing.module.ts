import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//components
import { VentaMainComponent } from './components/main.component';
import { PedidoStoreComponent } from './components/pedido/pedido-store.component';
import { PedidoDefaultComponent } from './components/default/default.component';
import { PedidoViewComponent } from './components/pedido/view.component';
import { PedidoEditComponent} from './components/pedido/pedido-edit.component';
import { SocioComponent } from './components/socio_vendedor/socio.component';
import { ReporteDefaultComponent } from './components/reporte/reporte-default.component';
import { ReportePremioComponent } from './components/reporte/reporte-premio.component';
import { ReportePiezaComponent } from './components/reporte/reporte-piezas.component';
import { AhorroViewComponent } from './components/ahorro/ahorro-view.component';
import { AhorroStatusComponent } from './components/ahorro/ahorro-status.component';
import { ahorroInicioComponent } from './components/ahorro/ahorro-inicio.component';
import { OverViewComponent } from './components/over/view.component';

;



const ventaRoutes: Routes = [
    {
       path:'ventas', component:VentaMainComponent, canActivateChild:[IsLoggedGuard],
                                                         children:[
                                                            {path:'',redirectTo:'welcome',pathMatch:'full'},
                                                            {path:'welcome',component:PedidoDefaultComponent},   
                                                            {path:'nuevo',component:PedidoStoreComponent},
                                                            {path: 'list',component:PedidoViewComponent},
                                                            {path: 'edit/:id',component:PedidoEditComponent},
                                                            {path:'listaventa',component:SocioComponent},
                                                            {path:'reporte',component:ReporteDefaultComponent},
                                                            {path:'premio',component:ReportePremioComponent},
                                                            {path:'piezas',component:ReportePiezaComponent},
                                                            {path:'ahorro',component:AhorroViewComponent},
                                                            {path:'lista',component:AhorroStatusComponent},
                                                            {path:'default',component:ahorroInicioComponent},
                                                            {path:'over',component:OverViewComponent}
                                                          ]
    }
  ]  
                                                   
@NgModule({
   imports:
   [
     RouterModule.forChild(ventaRoutes)
   ],
  exports:
  [
    RouterModule
  ]
})

export class VentaRoutingModule {}