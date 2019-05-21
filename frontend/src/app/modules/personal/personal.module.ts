import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonalRoutingModule } from './personal-routing.module';
import {MaterialModule} from '../../module-materilize';
// componentes
import { PersonalMainComponent } from './components/main.component';
import { PersonalViewComponent } from './components/view.component';
import { PersonalEditComponent } from './components/edit.component';
import { PersonalStoreComponent } from './components/store.component';
import { PersonalVisualComponent } from './components/visual.component';
import { PersonalRegisterComponent } from './components/register.component';

//declaracion del modulo
@NgModule({
declarations: [
    PersonalMainComponent,
    PersonalViewComponent,
    PersonalEditComponent,
    PersonalStoreComponent,
    PersonalRegisterComponent,
    PersonalVisualComponent,
],
imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PersonalRoutingModule,
    MaterialModule
],
exports: [
    PersonalMainComponent,
    PersonalViewComponent,
    PersonalEditComponent,
    PersonalStoreComponent,
    PersonalRegisterComponent,
    PersonalVisualComponent
],
providers: []
})

export class PersonalModule{}