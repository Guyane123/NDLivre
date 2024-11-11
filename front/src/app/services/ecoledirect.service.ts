import { Injectable } from '@angular/core';
import { ED } from '../../environments/environment.prod';
import { member } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class EcoleDirectService {
  async getEtablissement() {
    const token = sessionStorage.getItem('credentials');

    if (!token) return;

    const etablissement: Promise<member> = await (
      await fetch(ED.apiUrl + `/classes/24/`, {
        headers: {
          'User-Agent': navigator.userAgent,
          'X-Token': token,
          'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
        body: 'data=' + JSON.stringify({}),
      })
    ).json();

    console.log(etablissement);

    return etablissement;
  }
  async getUser(id: string) {
    const token = sessionStorage.getItem('credentials');

    if (!token) return;

    const user: Promise<member> = await (
      await fetch(
        ED.apiUrl + `/v3/eleves/${id}/details.awp?verbe=get&v=4.65.0`,
        {
          headers: {
            'User-Agent': navigator.userAgent,
            'X-Token': token,
          },
          method: 'POST',
          body: 'data=' + JSON.stringify({}),
        }
      )
    ).json();

    return user;
  }
}
