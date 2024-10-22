import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EcoleDirectService {
  async getUser(id: string) {
    return id;
  }
}
