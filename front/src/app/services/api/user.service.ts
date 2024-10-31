import { Injectable } from '@angular/core';
import { user } from '../../../types';

@Injectable({
  providedIn: 'root',
})
class UserService {
  async createUser(user: user) {}
}
