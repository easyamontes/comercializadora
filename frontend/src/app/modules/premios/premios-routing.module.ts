import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//component
import {PremiosMainComponent} from './components/premio-main.component';
import {PremiosViewComponent} from './components/premio-view.component';
import {PremioStoreComponent} from './components/premio-store.component';
import {PremioEditComponent} from './components/premio-edit.component';
const premiosRoutes: Routes= [
       {
          path:'premios',component:PremiosMainComponent, canActivateChild:[IsLoggedGuard],
                                  children:
                                   [
                                   {path:'',redirectTo:'list', pathMatch:'full'},
                                   {path:'list',component:PremiosViewComponent},
                                   {path:'nuevo',component:PremioStoreComponent},
                                   {path:'edit',component:PremioEditComponent},
                                   ]

       }
    ]
    @NgModule({
      imports:[
        RouterModule.forChild(premiosRoutes)
      ],
      exports:[
        RouterModule
      ]
    })
    export class PremiosRoutingModule{}