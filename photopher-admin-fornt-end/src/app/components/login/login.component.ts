import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { AuthService} from "../../services/atuh.service";
import { User} from "../../model/user";
import { Router} from "@angular/router";
import { Headers, Http} from '@angular/http';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  formTitle: String;
  user: User;
  loginForm: FormGroup;


  email = new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]);


  constructor(

    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: Http,
    private userService: UserService
  ) { }

  ngOnInit() {

    // this.authService.registerUser().subscribe(res=>{
    //   console.log(res);
    // });

    this.userService.getAllUser().subscribe(res=>{
      localStorage.setItem('clientId',res.data.clientId);
      localStorage.setItem('clientSecret',res.data.clientSecret);
    })

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    })
  }


  getUser(formData: FormGroup){

    this.user = new User();


    this.user.password = formData.value.password;
    this.user.email = formData.value.email;


    this.authService.userLogin(this.user).subscribe(response=>{

      console.log(response.token);

       localStorage.setItem('authToken',response.token);



      this.router.navigate(['/photographer']);

    })



  }


}
