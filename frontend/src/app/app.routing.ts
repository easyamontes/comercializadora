import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

//componentes
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './components/default/default.component';
import { PuestoViewComponent } from './components/puesto/puesto-view.component';
import { PuestoEditComponent } from './components/puesto/puesto-edit.component';

const appRoutes: Routes = [
    { path:'', component:LoginComponent },
    { path:'logout/:sure',component:LoginComponent },
    { path:'inicio', component:DefaultComponent},
    { path:'puesto/:id',component:PuestoEditComponent },
    { path:'puestos', component:PuestoViewComponent},
    { path:'**', component:LoginComponent }
];

export const appRoutingProviders: any[]=[];
export const routin: ModuleWithProviders = RouterModule.forRoot(appRoutes);