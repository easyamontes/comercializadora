import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//components
import { AlmacenMainComponent } from './components/main.component';
import { ExistenciaViewComponent } from './components/existencia/listview.component'
import { RequisicionViewComponent } from './components/requisiciones/view.component';
import { RequisicionStoreComponent } from './components/requisiciones/store.component';
import { AlmacenDefaultComponent } from './components/default/default.component';

const almacenRoutes: Routes =[
    {
        path:'almacen', component:AlmacenMainComponent, canActivateChild:[IsLoggedGuard],
                                                         children:[
                                                            { path:'',redirectTo:'welcome', pathMatch:'full' },
                                                            { path:'welcome', component:AlmacenDefaultComponent },
                                                            { path:'list',component:ExistenciaViewComponent },
                                                            { path:'requisicions',component:RequisicionViewComponent },
                                                            { path:'equinueva',component:RequisicionStoreComponent }
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
