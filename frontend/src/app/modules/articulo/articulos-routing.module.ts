import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//Componentes
import {ArticulosMainComponent} from './components/main.component';
import {ArticuloViewComponent} from './components/view.component';


const articulosRoutes: Routes =
[
    {
        path:'articulos', component:ArticulosMainComponent,
                                                         children:[
                                                            {path:'',redirectTo:'list', pathMatch:'full'},
                                                            {path:'list',component:ArticuloViewComponent}
                                                         ]
    }
]
@NgModule({
   imports:
   [
     RouterModule.forChild(articulosRoutes)
   ],
  exports:
  [
    RouterModule
  ]
})

export class ArticulosRoutingModule {}
