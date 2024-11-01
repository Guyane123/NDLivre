import { Injectable } from '@angular/core';
import { user } from '../../../types';
import { api } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
class UserService {
  async createUser(user: user) {
    const newUser = await fetch(api.apiUrl + '/user', {
      body: JSON.stringify(user),
    });

    return newUser;
  }
}

        /**const formattedUser: user= user.authType === "ED" ? {
            EDId: user.EDId,
            comments: [],
            loans: [],
            books: [],
            type: "user",
            history: []
        } : {
                pseudonym: user.pseudonym,
                image: user.image
                email: user.email
                type: "user",

            
        }**/