import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	user: Object;
	verification: Object;
	phone_v: boolean;
	email_v: boolean;
	nverified: boolean;
	showOTP: boolean;
	enteredOTP: any;
	mailsent: any;

	constructor(
    	private authService: AuthService
	) { }

	ngOnInit() {
    	this.authService.isVerified().subscribe(ver => {
			this.verification = ver.verification;
			this.phone_v = ver.verification.phone_v;
			this.email_v = ver.verification.email_v;
			this.nverified = !ver.verification.verified;
		},
		err => {
			console.log(err);
			return false;
		});

		this.mailsent = false;

		this.authService.getProfile().subscribe(profile => {
	    	this.user = profile.user;
	    },
	    err => {
	    	console.log(err);
	    	return false;
	    });
	}

	sendOTP() {
		this.authService.sendOTP().subscribe(res => {
			this.showOTP = res.success;
		},
		err => {
			console.log(err);
			return false;
		});
	}

	verifyOTP() {
		const enteredOTP = {
			enteredOTP: this.enteredOTP
		}
		this.authService.verifyOTP(enteredOTP).subscribe(res => {
			this.phone_v = res.status;
		},
		err => {
			console.log(err);
			return false;
		});

	}

	sendMail() {
		console.log("sendMail has been called");
		this.mailsent = true;
		this.authService.sendMail().subscribe(res => {
			this.mailsent = res.success;
		},
		err => {
			console.log(err);
			return false;
		});
	}
}
