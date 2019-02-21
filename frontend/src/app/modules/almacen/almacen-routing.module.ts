import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//components
import { AlmacenMainComponent } from './components/main.component';
import { ExistenciaViewComponent } from './components/existencia/listview.component'


const almacenRoutes: Routes =[
    {
        path:'almacen', component:AlmacenMainComponent, canActivateChild:[IsLoggedGuard],
                                                         children:[
                                                            {path:'',redirectTo:'list', pathMatch:'full'},
                                                            {path:'list',component:ExistenciaViewComponent},
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
