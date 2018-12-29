import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import {IsLoggedGuard} from './services/guards/islogged.guard'

//componentes
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './components/default/default.component';
import { PuestoViewComponent } from './components/puesto/puesto-view.component';
import { PuestoEditComponent } from './components/puesto/puesto-edit.component';
import { PuestoStoreComponent } from './components/puesto/puesto-store.component';

const appRoutes: Routes = [
    { path:'', component:DefaultComponent, canActivate:[ IsLoggedGuard ]},
    { path:'logout/:sure',component:LoginComponent },
    { path:'login',component:LoginComponent},
    { path:'inicio', component:DefaultComponent, canActivate:[ IsLoggedGuard ]},
    { path:'puesto/:id',component:PuestoEditComponent, canActivate:[ IsLoggedGuard ]},
    { path:'nuevo-puesto',component:PuestoStoreComponent, canActivate:[ IsLoggedGuard ]},
    { path:'puestos', component:PuestoViewComponent, canActivate:[ IsLoggedGuard ]},
    { path:'**', component:LoginComponent }
];

export const appRoutingProviders: any[]=[];
export const routin: ModuleWithProviders = RouterModule.forRoot(appRoutes);