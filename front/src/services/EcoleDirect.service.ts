import { Injectable } from "@angular/core";
import { fetchData } from "../utils/utils";
import { Console } from "console";
import { user } from "../types";


@Injectable({
    providedIn: 'root'
})




class UserSession {
    token: string | undefined
    fa: [{cn: string, cv: string}] | []
    accounts : [user] | undefined

    constructor() {
        this.token
        this.fa = []
        this.accounts

    }



    setToken(token: string) {
        this.token = token
    }

    setFa(cn: string, cv: string) {
        this.fa = [{cn, cv}]
        localStorage.setItem("token", JSON.stringify(this.fa))
    }

    getToken() {
        return this.token
    }

    getFa() {
        return this.fa
    }

    setAccounts(accounts: user) {
        this.accounts = [accounts]
        sessionStorage.setItem("accounts", JSON.stringify(this.accounts))
    }

    getAccounts() {
        return this.accounts
    }

}

const user = new UserSession()


export class EcoleDirectService {

    async login(identifiant: string, password: string, isRelogin: boolean): Promise<{ question: string, answears: Array<string> } | void> {

        const res = await (await fetch("https://api.ecoledirecte.com/v3/login.awp", { headers: { "User-Agent": navigator.userAgent }, method: "POST", body: "data=" + JSON.stringify({ data: { identifiant, motdepasse: password, isRelogin, uuid: "", fa: user.getFa() } }) })).json()
        const token = res.body.token
        user.setToken(token)


        if (!(res.body.code == 250)) { 
            user.setAccounts(res.body.accounts)
            return 
        }

        const resQCM = await (await fetch("https://api.ecoledirecte.com/v3/connexion/doubleauth.awp?verbe=get", {
            headers: { "User-Agent": navigator.userAgent, "X-Token": user.getToken()! }, method: "POST", body: "data=" + JSON.stringify(
                {}
            )
        })).json()

        if (!(resQCM.body.code == 200)) {
            throw new Error(resQCM.body.code)
        }

        const question = atob(resQCM.body.data.question)
        const answears = resQCM.body.data.propositions.map((el: string) => {
            return atob(el)
        })

        return { question, answears }

    }


    async qcm(answear: string) {
        if(!user.getToken()) throw new Error("Invalid token")
        const res = await (await fetch("https://api.ecoledirecte.com/v3/connexion/doubleauth.awp?verbe=post", { headers: { "User-Agent": navigator.userAgent, "X-Token": user.getToken()!  }, method: "POST", body: "data=" + JSON.stringify({ data: { choix: btoa(answear) } }) })).json()

        if(!(res.body.code == 200)) throw new Error("Invalid answear")
            const {cn, cv} = res.body.data
            user.setFa(cn, cv)
    
    }

    getAccount() {
        if (!user.getAccounts) return

        return user.getAccounts()![0]
    }

}