import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import {AuthServiceService} from '../services/auth-service.service';

@Injectable()
export class LoginResolveService {
  constructor(
    private router: Router, 
    private authService: AuthServiceService) {
  }

  resolve(): void {
    if (this.authService.isAuthorized()){
      this.router.navigate(['/profile']);
    } 
  }
}
