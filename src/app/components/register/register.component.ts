import { Component, OnInit } from '@angular/core';
import  {ValidateService} from '../../services/validate.service'
import  {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages'

//For the redirection in auth Service
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name: String;
	username: String;
	email: String;
	password: String;
	phone: String;
	usernameAvailable: Boolean;

  	constructor(
  		private validateService: ValidateService,
  		private flashMessage: FlashMessagesService,
  		private authService: AuthService,
  		private router: Router
  		) { }

  	ngOnInit() {
  	}

	onUsernameBlur(){
		const username = {
			username: this.username
		}

		this.authService.isAvailableUsername(username).subscribe(data =>{
  			if(data.success){
				this.usernameAvailable = true;
  				return true;
  			}
  			else{
				this.usernameAvailable = false;
  				this.flashMessage.show("Username is already taken. Please try another!",{cssClass: 'alert-danger', timeout: 5000});
  				return false;
  			}
  		});
	}

  	onRegisterSubmit(){
  		const user = {
  			name: this.name,
  			email: this.email,
  			username: this.username,
  			password: this.password,
			phone: this.phone
  		}

  		if(!this.validateService.validateRegister(user)){
  			this.flashMessage.show("All fields are mandatory",{cssClass: 'alert-danger', timeout: 5000});
  			return false;
  		}

		if(!this.validateService.validateName(user.name)){
			this.flashMessage.show("Please enter valid Name (Only Alphabets, spaces and dots)",{cssClass: 'alert-danger', timeout: 5000});
  			return false;
		}

		if(!this.validateService.validateUserName(user.username)){
			this.flashMessage.show("Username must be alphanumeric and can include dots ",{cssClass: 'alert-danger', timeout: 5000});
  			return false;
		}

		if(!this.validateService.validatePhone(user.phone)){
			this.flashMessage.show("Please enter valid Phone number",{cssClass: 'alert-danger', timeout: 5000});
  			return false;
		}

  		if(!this.validateService.validateEmail(user.email)){
  			this.flashMessage.show("Please use a valid Email",{cssClass: 'alert-danger', timeout: 5000});
  			return false;
  		}

  		//Register User
  		this.authService.registerUser(user).subscribe(data =>{

  			if(data.success){
  				this.flashMessage.show("You are now registered",{cssClass: 'alert-success', timeout: 3000});
  				this.router.navigate(['/login']);
  			}
  			else{
  				this.flashMessage.show("Registration failed. Please try again.",{cssClass: 'alert-danger', timeout: 3000});
  				this.router.navigate(['/register']);
  			}
  		});
  	}
}
