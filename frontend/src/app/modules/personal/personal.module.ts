import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonalRoutingModule } from './personal-routing.module';
// componentes
import { PersonalMainComponent } from './components/main.component';
import { PersonalViewComponent } from './components/view.component';
import { PersonalEditComponent } from './components/edit.component';
import { PersonalStoreComponent } from './components/store.component';
import { PersonalRegisterComponent } from './components/register.component';

//declaracion del modulo
@NgModule({
declarations: [
    PersonalMainComponent,
    PersonalViewComponent,
    PersonalEditComponent,
    PersonalStoreComponent,
    PersonalRegisterComponent
],
imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PersonalRoutingModule
],
exports: [
    PersonalMainComponent,
    PersonalViewComponent,
    PersonalEditComponent,
    PersonalStoreComponent,
    PersonalRegisterComponent
],
providers: []
})

export class PersonalModule{}