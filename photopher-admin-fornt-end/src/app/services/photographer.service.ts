import { Injectable } from '@angular/core';
import { Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired} from "angular2-jwt";



import { environment} from "../../environments/environment";

@Injectable()
export class PhotographerService {

  user: any;


  clientid = localStorage.getItem('clientId');//"kvHpAuV2bUZWY9mHpEnm";
  clientsecret = localStorage.getItem('clientSecret');
  authToken = localStorage.getItem('authToken');

  constructor(
    private http : Http
  ) { }

  photographerLogin(){

    let headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('clientid',`${this.clientid}`);
    headers.append('clientsecret',`${this.clientsecret}`);
    // headers.append('Authorization',`${this.authToken}`);


    return this.http.get(`${environment.baseUrl}/photographer`,{headers:headers})
      .map(res => res.json());
  }

  // publicAndPublicAlbumInfo(id){
  //
  //   let headers = new Headers();
  //
  //   let id2 = '5b14578c9edb69205092999e';
  //
  //   headers.append('Content-type','application/json');
  //   headers.append('clientid',`${this.clientid}`);
  //   headers.append('clientsecret',`${this.clientsecret}`);
  //   headers.append('Authorization',`${this.authToken}`);
  //   headers.append('albumId',`${id2}`);
  //
  //
  //   return this.http.get(`${environment.baseUrl}/album/photographerAllAlbum/${id}`,{headers:headers})
  //     .map(res => res.json());
  //
  // }

}
