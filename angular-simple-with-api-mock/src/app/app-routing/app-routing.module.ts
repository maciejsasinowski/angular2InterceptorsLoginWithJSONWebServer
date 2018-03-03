import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { LoginComponent } from '../login/login.component';
    import { ProfileComponent } from '../profile/profile.component';
    import {AuthorizationGuardService, LoginResolveService} from '../services/index';
    

    const routes: Routes = [
      {     
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
        {
            path: 'login',
            component: LoginComponent,
            resolve: [LoginResolveService]
        },        
        {
          path: 'profile',
          component: ProfileComponent,
          canActivate: [AuthorizationGuardService] 
      },
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }