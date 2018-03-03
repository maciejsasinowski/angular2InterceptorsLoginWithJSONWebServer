import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {config} from '../app-config';
import { UserProfile } from '../model/user-profile';

import 'rxjs/add/operator/map'


@Injectable()
export class UserDataService {

  constructor( private http: HttpClient ) { }
  
  getProfileData(userId:number) {
    return this.http.get<any>(`${config.api}/profiles?user_id=${userId}`)
        .map(res => {
            return res;
        });
  }
}
