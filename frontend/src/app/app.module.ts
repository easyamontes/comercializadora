import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {routin,appRoutingProviders} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { IsLoggedGuard } from './services/guards/islogged.guard';
import { UserService } from './services/user.service';
//importando modulos
import { PuestosModule } from './modules/puestos/puestos.module';
import { PersonalModule } from './modules/personal/personal.module';
import { OficinasModule } from './modules/oficinas/oficinas.module';
//conponentes
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './components/default/default.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routin,
    PuestosModule,
    PersonalModule,
    OficinasModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    appRoutingProviders,
    IsLoggedGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
