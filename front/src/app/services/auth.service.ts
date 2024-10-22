import { Injectable } from '@angular/core';
import { user } from '../../types';
import { ED } from '../../environments/environment.prod';

class UserSession {
  token: string = '';
  fa: [{ cn: string; cv: string }] | [];
  accounts: [user] | [] = [];

  constructor() {
    this.token;
    this.fa = [];
    this.accounts;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('credentials', JSON.stringify(this.token));
  }

  setFa(cn: string, cv: string) {
    this.fa = [{ cn, cv }];
    localStorage.setItem('fa', JSON.stringify(this.fa));
  }

  getToken() {
    return this.token;
  }

  getFa() {
    return this.fa;
  }

  setAccounts(accounts: user) {
    this.accounts = [accounts];
    sessionStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  getAccounts() {
    return this.accounts;
  }
}

const user = new UserSession();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async login(
    identifiant: string,
    password: string,
    isRelogin: boolean
  ): Promise<{ question: string; answears: Array<string> } | void> {
    const res = await (
      await fetch(ED.apiUrl + '/login.awp', {
        headers: { 'User-Agent': navigator.userAgent },
        method: 'POST',
        body:
          'data=' +
          JSON.stringify({
            identifiant,
            motdepasse: password,
            isRelogin,
            uuid: '',
            fa: user.getFa(),
          }),
      })
    ).json();
    console.log(res);
    const token = res.token;
    user.setToken(token);

    if (!(res.code == 250)) {
      user.setAccounts(res.data.accounts);
      return;
    }

    const resQCM = await (
      await fetch(ED.apiUrl + '/connexion/doubleauth.awp?verbe=get', {
        headers: {
          'User-Agent': navigator.userAgent,
          'X-Token': user.getToken()!,
        },
        method: 'POST',
        body: 'data=' + JSON.stringify({}),
      })
    ).json();

    if (!(resQCM.code == 200)) {
      throw new Error(resQCM.code);
    }

    const question = atob(resQCM.data.question);
    const answears = resQCM.data.propositions.map((el: string) => {
      return atob(el);
    });

    return { question, answears };
  }

  async qcm(answear: string) {
    if (!user.getToken()) throw new Error('Invalid token');
    const res = await (
      await fetch(ED.apiUrl + '/connexion/doubleauth.awp?verbe=post', {
        headers: {
          'User-Agent': navigator.userAgent,
          'X-Token': user.getToken()!,
        },
        method: 'POST',
        body: 'data=' + JSON.stringify({ data: { choix: btoa(answear) } }),
      })
    ).json();

    if (!(res.code == 200)) throw new Error('Invalid answear');
    const { cn, cv } = res.data;
    user.setFa(cn, cv);
  }

  getAccount() {
    if (!user.getAccounts) return;

    return user.getAccounts()![0];
  }
}
