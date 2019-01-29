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
import {ArticulosModule} from './modules/articulo/articulos.module';
import {MaterialModule} from './module-materilize';
import {BancosModules} from './modules/bancos/bancos.modules';
import {ProveedoresModule} from './modules/proveedores/proveedores.module';
//conponentes
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './components/default/default.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    ArticulosModule,
    BrowserAnimationsModule,
    MaterialModule,
    BancosModules,
    ProveedoresModule
  ],
  providers: [
    appRoutingProviders,
    IsLoggedGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
