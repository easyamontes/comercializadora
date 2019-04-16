import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//components
import { VentaMainComponent } from './components/main.component';
import { PedidoStoreComponent } from './components/pedido/pedido-store.component';
import { PedidoDefaultComponent } from './components/default/default.component';
import { PedidoViewComponent } from './components/pedido/view.component';
import { PedidoEditComponent} from './components/pedido/pedido-edit.component';;



const ventaRoutes: Routes = [
    {
       path:'ventas', component:VentaMainComponent, canActivateChild:[IsLoggedGuard],
                                                         children:[
                                                            {path:'',redirectTo:'welcome',pathMatch:'full'},
                                                            {path:'welcome',component:PedidoDefaultComponent},   
                                                            {path:'nuevo',component:PedidoStoreComponent},
                                                            {path: 'list',component:PedidoViewComponent},
                                                            {path: 'edit/:id',component:PedidoEditComponent},
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
