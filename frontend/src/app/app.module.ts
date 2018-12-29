import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {routin,appRoutingProviders} from './app.routing';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { IsLoggedGuard } from './services/guards/islogged.guard';
import { UserService } from './services/user.service';
//conponentes
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './components/default/default.component';
import { PuestoViewComponent } from './components/puesto/puesto-view.component';
import { PuestoEditComponent } from './components/puesto/puesto-edit.component';
import {PuestoStoreComponent} from './components/puesto/puesto-store.component'


@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    LoginComponent,
    PuestoViewComponent,
    PuestoEditComponent,
    PuestoStoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routin
  ],
  providers: [
    appRoutingProviders,
    IsLoggedGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
