import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {NavController,LoadingController} from '@ionic/angular';
//import { PopoverController } from '@ionic/angular';
import { Router  } from '@angular/router';


@Component({
  selector: 'app-popoverpage',
  templateUrl: './popoverpage.page.html',
  styleUrls: ['./popoverpage.page.scss'],
})
export class PopoverpagePage implements OnInit {

  constructor( private router: Router,private popoverController: PopoverController,public navCtrl: NavController) { 

   console.log("popover")
  }

  ngOnInit() {
  }

   logout(){
    console.log("sdgsdkfjsd")
    this.popoverController.dismiss();
    localStorage.clear()
    this.navCtrl.navigateBack('/detailspage')
    //this.router.navigate(['/home'],{replaceUrl: true})
  }

}
