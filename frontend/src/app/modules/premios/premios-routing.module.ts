import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//component
const premiosRoutes: Routes= [
       {


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