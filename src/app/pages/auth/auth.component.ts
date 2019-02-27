import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'app/services/app-service.service';
import { Router } from '@angular/router';
import { TokenService } from 'app/services/token.service';
import { LoginSignupService } from 'app/services/login-signup.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  toggleFormClass;
  public form = {
    username : null,
    password : null
  };

  public error = [];


  showSignUp() {
    this.toggleFormClass = 'bounceLeft';
  }

  showLogin() {
    this.toggleFormClass = 'bounceRight';
  }



  constructor(private loginRegisterService: LoginSignupService,
    private tokenService: TokenService,
  private router: Router,
  private authService: AppServiceService) { }

  ngOnInit() {
  }

  login() {
    this.loginRegisterService.login(this.form).subscribe(data => console.log(data)
    );
  }

  signUp() {
    this.loginRegisterService.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => {
        this.handleError(error);
      });
  }

  handleError(error) {
    this.error = error.errors;
  }

  handleResponse(data) {
    // this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/');
  }

}
