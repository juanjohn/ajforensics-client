import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class QueryService {
	authToken: any;
	user: any;
	query: any;
	enteredOTP: any;
  	constructor(private http:Http) { }

	postQuery(query){
		const nquery={
			query: query
		}
		let headers = new Headers();
		this.loadToken();
		headers.append('Authorization',this.authToken);
		headers.append('Content-Type','application/json');
		console.log("thisthsitst: "+JSON.stringify(nquery))

		return this.http.post('https://ajforensics.com/queries/postQuery', nquery, {headers: headers})
			.map(res => res.json());
  	}

	loadToken(){
    	const token = localStorage.getItem('id_token');
    	this.authToken = token;
    }
}
