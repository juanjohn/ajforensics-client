import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
	authToken: any;
	user: any;
	enteredOTP: any;
  	constructor(private http:Http) { }

	isAvailableUsername(username){
		let headers = new Headers();
  		headers.append('Content-Type','application/json');
		//console.log(this.http.post('https://ajforensics.com/users/isAvailableUsername', username, {headers: headers}).map(res => res.json()));
  		return this.http.post('https://ajforensics.com/users/isAvailableUsername', username, {headers: headers}).map(res => res.json());
	}

  	registerUser(user){
  		let headers = new Headers();
  		headers.append('Content-Type','application/json');

  		return this.http.post('https://ajforensics.com/users/register', user, {headers: headers})
  			.map(res => res.json());
  	}
    authenticateUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');

      return this.http.post('https://ajforensics.com/users/authenticate', user, {headers: headers})
        .map(res => res.json());
    }

    getProfile(){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.get('https://ajforensics.com/users/profile', {headers: headers})
        .map(res => res.json());
    }

	isVerified(){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.get('https://ajforensics.com/users/isverified', {headers: headers})
        .map(res => res.json());
    }

	sendOTP(){
		let headers = new Headers();
		this.loadToken();
		headers.append('Authorization',this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get('https://ajforensics.com/users/sendotp', {headers: headers})
          .map(res => res.json());
	}

	verifyOTP(enteredOTP){
		let headers = new Headers();
		this.loadToken();
		headers.append('Authorization',this.authToken);
        headers.append('Content-Type','application/json');
		return this.http.post('https://ajforensics.com/users/verifyotp', enteredOTP, {headers: headers})
          .map(res => res.json());
	}

	sendMail(){
		let headers = new Headers();
		console.log("inner sendMail called");
		this.loadToken();
		headers.append('Authorization',this.authToken);
        headers.append('Content-Type','application/json');
		return this.http.get('https://ajforensics.com/users/sendmail', {headers: headers})
          .map(res => res.json());
	}

    storeUserData(token,user){
    	localStorage.setItem('id_token',token);
    	localStorage.setItem('user', JSON.stringify(user));
    	this.authToken=token;
    	this.user=user;
    }

    loadToken(){
      const token = localStorage.getItem('id_token');
      this.authToken = token;
    }

    loggedIn(){
      return tokenNotExpired('id_token');
    }

    logout(){
      this.authToken=null;
      this.user=null;
      localStorage.clear();
    }
}
