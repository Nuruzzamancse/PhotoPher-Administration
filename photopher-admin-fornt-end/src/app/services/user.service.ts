import { Injectable } from '@angular/core';
import { Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired} from "angular2-jwt";
import { environment} from "../../environments/environment";

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }

  getAllUser()
  {

    let headers = new Headers();

    headers.append('Content-type','application/json');

    return this.http.get(`${environment.baseUrl}/client`,{headers:headers})
      .map(res => res.json());

  }



}
