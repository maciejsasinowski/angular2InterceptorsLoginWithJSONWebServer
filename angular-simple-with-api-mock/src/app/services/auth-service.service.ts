import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import {config} from '../app-config';
import {UserLogin} from '../model/user-login';
import {StorageData} from '../model/storage-data';

@Injectable()
export class AuthServiceService {

  userLoginObservable:Subject<any>;
  constructor(private http: HttpClient) {
    this.userLoginObservable= new Subject<any>(); 
   }
 
  login(data:UserLogin) {
      return this.http.post<any>(`${config.api}/auth/login`, { username: data.username, password: data.password })
          .map(res => {
              if (res && res.token && res.user_id) {
                  localStorage.setItem('currentUser', JSON.stringify(res));
              }
              return res;
          });
  }

  logout() {
      localStorage.removeItem('currentUser');
  }

   getUserData(): StorageData{
    try {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.user_id && currentUser.token) {
            return currentUser;
        }
    }catch (e){
      localStorage.removeItem('currentUser');        
    }



  }
  isAuthorized(): Boolean{
    try {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser && currentUser.user_id && currentUser.token;
    }catch (e){
      localStorage.removeItem('currentUser');        
      return false;
    }
}

  public observableLogin(): Observable<any> {
    return this.userLoginObservable.asObservable();
}
public setLoginSubscription(){
    this.userLoginObservable.next(true);
}

}
