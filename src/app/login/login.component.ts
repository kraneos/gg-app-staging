import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../shared/services/login.service';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  showError: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private currentUserService: CurrentUserService
  ) { }

  ngOnInit() {
    this.showError = false;
  }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(
      user => {
        this.loginService
          .getRolesByUser(user.objectId)
          .subscribe(
          roles => {
            let notClient = false;
            user.roles = roles;
            this.currentUserService.set(user);
            roles.forEach(r => {
              if (r.name.indexOf('Clients') === -1 && !notClient) {
                notClient = true;
              }
            });
            this.loginService
              .getSegguClient(user.segguClient.objectId)
              .subscribe(
              segguClient => {
                this.loginService
                  .getRolesBySegguClient(segguClient)
                  .subscribe(
                  rolesBySegguClient => {
                    let postACL = {};

                    // Guarda los roles y el usuario como el ACL para los registros que se guarden por la app.
                    postACL[user.objectId] = { read: true, write: true };

                    rolesBySegguClient.forEach(function (r) {
                      postACL['role:' + r.name] = { read: true, write: true };
                    });
                    this.currentUserService.setPostACL(postACL);

                    if (notClient) {
                      this.router.navigate(['/']);
                    } else {
                      this.router.navigate(['/client-policies']);
                    }
                  },
                  onError
                  );
              },
              onError
              );
          });
      },
      onError
      );

    function onError(error) {
      this.error = error.message || error;
      this.showError = true;
      return Observable.throw(error.message || error);
    }
  }
}
