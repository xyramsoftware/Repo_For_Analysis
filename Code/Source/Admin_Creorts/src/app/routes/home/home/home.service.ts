import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../constant.service';

@Injectable()

export class HomeService {

	constructor(public http: Http, public constantService: ConstantService) { }

	
	getQuestion()
	{
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'eventfeedback/event/question/one', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}

	//Get All social media count
	getSocialMedia() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'socialMedia/all', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}
	// Get gender count
	getGenderCount()
	{
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'users/gender', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}
	//Get occupation count
	getOccupationCount()
	{
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'users/occupation', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}
	getUserCount() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'users/usercount', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}

	getAccompanyCount() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'accompanies/accompanycount', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}
	getTeamCount() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'users/teammembers/count', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}

	getReferCount() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'referFriends/bycount', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}

	getSportsCount() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'users/sportsIndividual', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}

	getCulturalCount() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'users/cultural', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}
	getTeamEvenCount() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'users/team', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}
	getFeedbackCount() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let authToken = localStorage.getItem('admintoken');
		headers.append('Authorization', authToken);
		return this.http.get(this.constantService.API_ENDPOINT + 'feedback/count', {
			headers: headers
		})
			.map((data: Response) => data.json())
			.catch(this.handleError)
	}
	
	private handleError(error: any) {
		return Observable.throw(error.json());

	}
}