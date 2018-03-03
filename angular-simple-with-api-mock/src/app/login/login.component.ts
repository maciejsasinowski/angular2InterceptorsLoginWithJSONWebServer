import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserLogin} from '../model/user-login';
import {AuthServiceService} from '../services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: UserLogin = {};
  error:string='';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthServiceService,) { }

  ngOnInit() {

  }

  login(){
    this.authenticationService.login(this.model).subscribe(
        data => {
            this.router.navigate(['/profile']);
            this.authenticationService.setLoginSubscription();
        },
        error => {
          this.error='Bad username';
        });
  }
}
