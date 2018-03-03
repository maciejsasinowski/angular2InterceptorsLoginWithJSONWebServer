import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isLoggedIn:Boolean=false;
  private loginObservable: Subscription;

  constructor(
     private route: ActivatedRoute,
     private router: Router,
     private authenticationService: AuthServiceService,
  ) { 
    this.isLoggedIn=authenticationService.isAuthorized();
    this.handleLoginObservable();
  }

  ngOnInit() {
  }

  public logot(){
    this.authenticationService.logout();
    this.isLoggedIn=false;
  }

  private handleLoginObservable(){
    this.loginObservable = this.authenticationService.observableLogin().subscribe(data => {
      this.isLoggedIn=this.authenticationService.isAuthorized();
     });
  }
}
