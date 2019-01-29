import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//Componentes
import {ProveedoresMainComponent} from './components/main.component';
import {ProveedorViewComponent} from './components/view.component';
import {ProveedorStoreComponent} from './components/store.component';

const proveedoresRoutes: Routes =[{
    path:'proveedores', component:ProveedoresMainComponent,
                                                        children:[
                                                          {path:'',redirectTo:'list', pathMatch:'full'},
                                                          {path:'list',component:ProveedorViewComponent},
                                                          {path:'nuevo',component:ProveedorStoreComponent}
                                                        ]
}]

@NgModule({
    imports:
    [
      RouterModule.forChild(proveedoresRoutes)
    ],
   exports:
   [
     RouterModule
   ]
 })
 
 export class ProveedoresRoutingModule {}
 