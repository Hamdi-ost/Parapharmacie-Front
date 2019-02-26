import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post('http://localhost:8080/users/sign-up', data);
  }

  login(data) {
    return this.http.post('http://localhost:8080/login', data);
  }

}
