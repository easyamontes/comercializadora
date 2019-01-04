import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { IsLoggedGuard } from '../../services/guards/islogged.guard';
// componentes
import { PersonalMainComponent } from './components/main.component';
import { PersonalViewComponent } from './components/view.component';
import { PersonalEditComponent } from './components/edit.component';
import { PersonalStoreComponent } from './components/store.component';

const personalRoutes: Routes =[
    {
        path:'personal',component:PersonalMainComponent, canActivateChild:[IsLoggedGuard],
                                                        children:[
                                                            {path:'list',component:PersonalViewComponent},
                                                            {path: '', redirectTo: 'list', pathMatch: 'full'},
                                                            {path:'edit/:id',component:PersonalEditComponent},
                                                            {path:'nuevo',component:PersonalStoreComponent }
                                                        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(personalRoutes)
    ],
    exports: [
        RouterModule
    ]
  })

  export class PersonalRoutingModule {}