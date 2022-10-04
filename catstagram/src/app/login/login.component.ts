import { Component, OnInit } from '@angular/core';
import{FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService ) {
      this.loginForm = this.fb.group( {
        'username': ['',[Validators.required]],
        'password':['', Validators.required]
      })
   }

  ngOnInit(): void {
  }

  login(){

    this.authService.login(this.loginForm.value).subscribe(data => {
      this.authService.saveToken(data['token']);
      this.router.navigate(["cats"])
    })
  }
  get username() {
    console.log(this.loginForm.get('username'))
    return this.loginForm.get('username');
  }
  get password (){
    return this.loginForm.get('password')
  }
}
//username.errors.required
