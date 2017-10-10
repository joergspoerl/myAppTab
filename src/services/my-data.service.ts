import { Injectable } from '@angular/core';

import { User } from './user';
import { Userlist } from './mock-userlist';

@Injectable()
export class MyDataService {

  constructor() { }

  getUsers(): User[] {
    return Userlist;
  }

}
