import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jose from "jose";
//@ts-ignore
import * as simpleCrypto from "simple-crypto";

import constants from './constants';
import config from './config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  apiLogin(claims: any, userInfos: Object): Promise<any> {
    return new Promise((resolve, reject) => {
    return this._encodeToken(claims).then((encoded) => {
      console.log("encoded", encoded);
      return this.http.post('/api/authenticate', {accessToken: encoded, userInfos: userInfos}).subscribe((res: any) => {
        console.log("result from be", res);
                localStorage.setItem(constants.lsTokenKey, res.token);
                resolve(res.user);
      });
    }).catch((e) => reject(e));
    });
  }

  async _encodeToken(claims: any) {

    // facebookId is salted before sent
    const encoded = simpleCrypto.encrypt(claims.sub.facebookId, config.appSalts);
    claims.sub.facebookId = encoded;

    // key is encoded through Uint8Array
    const jwt = await new jose.SignJWT({ 'sub': JSON.stringify(claims.sub) })
        .setIssuer(claims.issuer)
        .setExpirationTime(Math.floor(Date.now() / 1000) + (60 * 60 * 72) /* 72h */)
        .setProtectedHeader({ alg: 'HS512' })
        .sign(new TextEncoder().encode(config.appSecret))
    return jwt;
  }

  getEvents() {
    ////////////// Events - no events found nearby, button + Create One
    const headers = new HttpHeaders();
    if(!localStorage.getItem(constants.lsTokenKey)) {
      return;
    }
    headers.set("Authorization", localStorage.getItem(constants.lsTokenKey)!);
    return this.http.get('/api/events', {headers: headers});
  }
}
