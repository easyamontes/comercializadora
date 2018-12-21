import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'Comercializadora DOY';
  public token;
  public identity;

  constructor(
    private _UserService: UserService
  ){
    this.identity = _UserService.getIdentity();
    this.token = _UserService.getToken();
  }

  ngDoCheck(){
    this.identity = this._UserService.getIdentity();
    this.token = this._UserService.getToken();
  }
  
  ngOnInit(){

  }
}
