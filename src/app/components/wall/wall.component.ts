import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {QueryService} from '../../services/query.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
	user: Object;
	firstname: String;
	query: String;
	id: String;
	queries: Object;
	verification: Object;
	phone_v: boolean;
	email_v: boolean;
	nverified: boolean;
	showOTP: boolean;
	enteredOTP: any;
	mailsent: any;
	phone_response: string;
	retry: boolean;

	constructor(
	  private authService: AuthService,
	  private queryService: QueryService,
	  private router: Router
	) { }

	ngOnInit() {
		this.authService.isVerified().subscribe(ver => {
			this.verification = ver.verification;
			this.phone_v = ver.verification.phone_v;
			this.email_v = ver.verification.email_v;
			this.nverified = !ver.verification.verified;
			console.log(this.nverified);
			if(this.nverified==true){
				this.router.navigate(['/dashboard']);
			}
		},
		err => {
			console.log(err);
			return false;
		});


		this.mailsent = false;

		this.authService.getProfile().subscribe(profile => {
			this.user = profile.user;
			this.firstname = profile.user.name.split(" ")[0];
	  	},
		err => {
		  console.log(err);
		  return false;
		});
	}

	onPostQuery() {
		this.queryService.postQuery(this.query).subscribe(queryres => {

			if(typeof(this.queries) == "undefined"){
				this.queries={"queries":[queryres]};
			}else{
				this.queries["queries"].push(queryres);
			}
			console.log(JSON.stringify(this.queries));
			localStorage.setItem('queries', JSON.stringify(this.queries));
		});
	}

}
