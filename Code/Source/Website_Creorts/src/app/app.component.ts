import { Component,OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FooterService } from './footer.service';
import { RouteConfigLoadEnd } from "@angular/router";
import { RouteConfigLoadStart } from "@angular/router";
import { Event as RouterEvent } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ISKF';
  public imagesUrl;
  public loggedIn:boolean;
  userDetails: any;
  links: any=[];
  public loading: boolean;
  
  constructor(private router: Router, private restService: FooterService,private renderer: Renderer2) {
    this.userDetails = JSON.parse(localStorage.getItem('userdetails'));
    this.allLinks();
    this.loading = false;
 
		// As the router loads modules asynchronously (via loadChildren), we're going to
		// keep track of how many asynchronous requests are currently active. If there is
		// at least one pending load request, we'll show the indicator.
		var asyncLoadCount = 0;
 
		// The Router emits special events for "loadChildren" configuration loading. We
		// just need to listen for the Start and End events in order to determine if we
		// have any pending configuration requests.
		router.events.subscribe(
			( event: RouterEvent ) : void => {
 
				if ( event instanceof RouteConfigLoadStart ) {
 
					asyncLoadCount++;
 
				} else if ( event instanceof RouteConfigLoadEnd ) {
 
					asyncLoadCount--;
 
				}
 
				// If there is at least one pending asynchronous config load request,
				// then let's show the loading indicator.
				// --
				// CAUTION: I'm using CSS to include a small delay such that this loading
				// indicator won't be seen by people with sufficiently fast connections.
				this.loading = !! asyncLoadCount;
 
			}
		);

  }
  ngOnInit(){
    // this.userDetails = JSON.parse(localStorage.getItem('userdetails'));
    let loader = this.renderer.selectRootElement('#loader');
    loader.style.display = "none";
  }

  isLogin() {
    if(localStorage.getItem('webtoken') != null){
      this.userDetails = JSON.parse(localStorage.getItem('userdetails'));
      this.fixNameForUI();
      return true;
    }
    return false;
}

fixNameForUI(){
  let name = this.userDetails.name;
  var splitted = name.split(" ", 2);
  name = splitted[0];
  if(name.length > 20) 
  name = name.substring(0,15) + '...';
  this.userDetails.shortName = name;
}

logout(){
  this.loading=true;
  // localStorage.removeItem('webtoken');
  // localStorage.removeItem('userdetails');
  // localStorage.removeItem('eventdetail');
  // localStorage.removeItem('Events');
  localStorage.clear();
  this.userDetails = null;
  this.loading = false
  this.router.navigate([''])
}

allLinks(){
  this.restService.getAllLinks().subscribe(data=>{
    console.log(data);
    this.links=data[0];
  })
}
updatecount(obj:any,) {
  this.restService.getsociallinks(obj,this.links._id).subscribe(data => {
      console.log(data)
  })
}

doFbLogin() {
   let obj ={
     "type":"facebook"
   }
  console.log(name)
  this.updatecount(obj)
  window.open("https://www.facebook.com/CREORTS/?hc_ref=ARTxbA_3bMe-jqUSq9_IokuqFYUZM0fOjP5EuB0_RmjLU-WPz6fxgulon1O7fAyIYWo&fref=nf&__xts__[0]=68.ARClbua1VCVvcE-_0vr0jlTJOPkROtOmCD6QXcLlRLLY2pUAnJ3UmpHd0xOzEEZHo7LDcU3aK6TuFWFX0G2Z_NV9PqwUC8VoSrr3Emq3tOJVn-4hWBP1vUSUju8BtPFVTfGTlYFvQfYt0I3i02aHe5t4vPa-NlIxTSPAOQ_Dc9fVmywFcDEaDH-prTQB5ErLShg_14sZi0-Oppz9TAeTzbWb43kQK7FxheJUp6LWRcrCpKHuRmqHH3dnxg6pFQRiKnOyrtXPCh-p-JbtA__S6tLr4CR-0dzUKxs-sDaclKjYevBfA6k9O7kP8szzZqOSpmzWDih4K2U0JMqj1ptDzgjAxbpn&__tn__=kC-R")
}

instaLogin() {
  let obj ={
    "type":"instagram"
  }
  console.log(name)
  this.updatecount(obj)
  window.open("https://www.instagram.com/creorts/?hl=en")
}
twitterLogin() {
  let obj = {
    "type":"twitter"
  }
  console.log(name)
  this.updatecount(obj)
  window.open("https://media.twitter.com/en_us/creators.html")
}

}
