import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//componentes
import {OficinaMainComponent} from './components/oficina-main.component';
import {OficinaViewComponent} from './components/oficina-view.component';
import {OficinaEditComponent} from './components/oficina-edit.component';
import {OficinaStoreComponent} from './components/oficina-store.component';

const oficinasRoutes: Routes =
[
  {
    path:'oficinas',component:OficinaMainComponent, canActivateChild:[IsLoggedGuard],
                                                  children:
                                                  [
                                                  {path:'list',component:OficinaViewComponent},
                                                  {path:'nuevo',component:OficinaStoreComponent},
                                                  {path:'edit/:id',component:OficinaEditComponent},
                                                  {path:'',redirectTo:'list', pathMatch:'full'}
                                                  ]
     }
]
@NgModule({
   imports:
   [
     RouterModule.forChild(oficinasRoutes)
   ],
  exports:
  [
    RouterModule
  ]
})

export class OficinasRoutingModule {}
