import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoggedGuard} from '../../services/guards/islogged.guard';
//componentes
import {BancosMainComponent} from './components/banco-main.component';
import {BancosViewComponent} from './components/banco-view.component';
import {BancoEditComponent} from  './components/banco-edit.component';
import {BancoStoreComponent} from  './components/banco-store.component';


const bancosRoutes: Routes =[
    {
        path:'bancos', component:BancosMainComponent,canActivateChild:[IsLoggedGuard],
                                               children:[
                                                    {path:'',redirectTo:'list',
                                                    pathMatch:'full'},
                                                    {path:'list',component:BancosViewComponent},
                                                    {path:'nuevo',component:BancoStoreComponent},
                                                    {path:'edit/:id',component:BancoEditComponent},
                                                ]
    }
]

//ngmodules
@NgModule({
    imports:[
        RouterModule.forChild(bancosRoutes)
    ],
    exports:[
        RouterModule
    ],
})

export class BancosRoutingModule{}