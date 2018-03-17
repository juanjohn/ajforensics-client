import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
  	if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
  		return false;
  	}
  	else{
  		return true;
  	}
  }

	validateEmail(email){
	  	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		return re.test(email);
 	}

	validateName(name){
  		const re= /^[a-zA-Z .]+$/;
		return re.test(name);
	}

	validatePhone(phone){
		const re= /^\+?([0-9]{2})([0-9]{4,10})$/;
		return re.test(phone);
	}
	validateUserName(username){
		const re= /^[a-zA-Z0-9.]+$/;
		return re.test(username);
	}

}
