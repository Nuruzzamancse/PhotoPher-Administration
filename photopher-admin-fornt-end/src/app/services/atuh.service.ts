import { Injectable } from '@angular/core';
import { Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired} from "angular2-jwt";



import { environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  clientid = localStorage.getItem('clientId');//"kvHpAuV2bUZWY9mHpEnm";
  clientsecret = localStorage.getItem('clientSecret');//"GEysq8JCn6vOzfqghZ4jsruFhnNoIz3O9nNpFV6WDdmX7gjP2MhCfFrgqR9ezdmo0hTKL";

  constructor(
    private http : Http
  ) { }

  userLogin(userCredentials){

    let headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('clientid',`${this.clientid}`);
    headers.append('clientsecret',`${this.clientsecret}`);

    // console.log(userCredentials);

    return this.http.post(`${environment.baseUrl}/auth/login`,userCredentials,{headers:headers})
      .map(res => res.json());
  }

  registerUser(){

    let data = {
      email: 'admin@gmail.com',
      password: 'adminpassword',
      name: 'Nuruzzaman'
    }

    let headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('clientid',`${this.clientid}`);
    headers.append('clientsecret',`${this.clientsecret}`);

    console.log(headers);


    return this.http.post(`${environment.baseUrl}/admin`,data,{headers:headers})
      .map(res => res.json());
  }

  getCategory(){

    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get(`${environment.baseUrl}/category`,{headers:headers})
      .map(res => res.json());
  }

  getAllUser()
  {

    let headers = new Headers();

    headers.append('Content-type','application/json');

    return this.http.get(`${environment.baseUrl}/user`,{headers:headers})
      .map(res => res.json());

  }

  getSingleUser(id)
  {

    let headers = new Headers();

    headers.append('Content-type','application/json');

    return this.http.get(`${environment.baseUrl}/user/${id}`,{headers:headers})
      .map(res => res.json());

  }

  postUser(user)
  {

    let headers = new Headers();

    headers.append('Content-type','application/json');

    return this.http.post(`${environment.baseUrl}/user`,user,{headers:headers})
      .map(res => res.json());
  }

  updateUser(user){


    let headers = new Headers();

    headers.append('Content-type','application/json');

    return this.http.patch(`${environment.baseUrl}/user/${user._id}`,user,{headers:headers})
      .map(res => res.json());

  }


  storeUserData(token,user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }


}
