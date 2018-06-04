import { Injectable } from '@angular/core';
import { Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired} from "angular2-jwt";
import {environment} from '../../environments/environment';


@Injectable()
export class PhotoService {

  constructor(
    private http: Http
  ) { }


  clientid = localStorage.getItem('clientId');//"kvHpAuV2bUZWY9mHpEnm";
  clientsecret = localStorage.getItem('clientSecret')
  authToken = localStorage.getItem('authToken');

  getPhoto(id){


    let headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('clientid',`${this.clientid}`);
    headers.append('clientsecret',`${this.clientsecret}`);
    headers.append('Authorization',`${this.authToken}`)

    console.log(id);

    return this.http.get(`${environment.baseUrl}/photo/photographerAllPhotos/${id}`,{headers:headers})
      .map(res => res.json());
  }

  getAlbumsPhoto(id){

    let headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('clientid',`${this.clientid}`);
    headers.append('clientsecret',`${this.clientsecret}`);
    headers.append('Authorization',`${this.authToken}`)

    console.log(id);

    return this.http.get(`${environment.baseUrl}/photo/album/${id}`,{headers:headers})
      .map(res => res.json());
  }

  deletePhoto(id){

    let headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('clientid',`${this.clientid}`);
    headers.append('clientsecret',`${this.clientsecret}`);
    headers.append('Authorization',`${this.authToken}`)

    console.log(id);

    return this.http.delete(`${environment.baseUrl}/photo/${id}`,{headers:headers})
      .map(res => res.json());
  }



}
