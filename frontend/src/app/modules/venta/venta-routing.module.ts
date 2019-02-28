import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//components
import { VentaMainComponent } from './components/main.component';
import { PedidoStoreComponent } from './components/pedido/pedido-store.component';


const ventaRoutes: Routes = [
    {
       path:'ventas', component:VentaMainComponent, canActivateChild:[IsLoggedGuard],
                                                         children:[
                                                            {path:'',redirectTo:'nuevo', pathMatch:'full'},
                                                            {path:'nuevo',component:PedidoStoreComponent}
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
