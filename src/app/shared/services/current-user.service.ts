import { Injectable } from '@angular/core';
import { CurrentUser } from '../domain/current-user';

@Injectable()
export class CurrentUserService {
  private SEGGU_USER = 'segguUser';
  private SEGGU_POST_ACL = 'segguPostACL';

  get(): CurrentUser {
    let user = localStorage.getItem(this.SEGGU_USER);
    return JSON.parse(user);
  }

  set(user: CurrentUser) {
    let userStr = JSON.stringify(user);
    localStorage.setItem(this.SEGGU_USER, userStr);
  }

  remove() {
    localStorage.removeItem(this.SEGGU_USER);
  }

  getPostACL() {
    let postACL = localStorage.getItem(this.SEGGU_POST_ACL);
    return JSON.parse(postACL);
  }

  setPostACL(postACL) {
    let postACLStr = JSON.stringify(postACL);
    localStorage.setItem(this.SEGGU_POST_ACL, postACLStr);
  }

  removePostACL() {
    localStorage.removeItem(this.SEGGU_POST_ACL);
  }
}
