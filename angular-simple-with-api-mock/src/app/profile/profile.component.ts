import { Component, OnInit } from '@angular/core';
import {AuthServiceService, UserDataService} from '../services/index';
import { UserProfile } from '../model/user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile:UserProfile={};

  constructor(private authenticationService: AuthServiceService,
        private userDataService: UserDataService,) { }

  ngOnInit() {
    this.userDataService.getProfileData(this.authenticationService.getUserData().user_id).subscribe(
      data => {
        this.userProfile=data[0];
      },
      error => {
      });
  }

}
