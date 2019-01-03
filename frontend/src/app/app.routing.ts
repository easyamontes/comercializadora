import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import {IsLoggedGuard} from './services/guards/islogged.guard'

//componentes
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './components/default/default.component';


const appRoutes: Routes = [
    { path:'', component:DefaultComponent, canActivate:[ IsLoggedGuard ]},
    { path:'', redirectTo: 'inicio', pathMatch: 'full' },
    { path:'logout/:sure',component:LoginComponent },
    { path:'login',component:LoginComponent},
    { path:'inicio', component:DefaultComponent, canActivate:[ IsLoggedGuard ]},
    { path:'**', component:LoginComponent }
];

export const appRoutingProviders: any[]=[];
export const routin: ModuleWithProviders = RouterModule.forRoot(appRoutes);