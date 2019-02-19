import { Component, OnInit, DoCheck,ChangeDetectorRef,OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit, DoCheck,OnDestroy{
  title = 'Comercializadora DOY';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public token;
  public identity;

  constructor(
    private _UserService: UserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ){
    this.identity = _UserService.getIdentity();
    this.token = _UserService.getToken();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngDoCheck(){
    this.identity = this._UserService.getIdentity();
    this.token = this._UserService.getToken();
  }
  
  ngOnInit(){
  }

  ngOnDestroy(){
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
