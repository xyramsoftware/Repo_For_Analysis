import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage,LoadingController} from 'ionic-angular';
import {Service} from '../../app/service';
import {OrderDetailsService} from './order-details.service';
import {OrdersService} from '../orders/orders.service';

@IonicPage()
@Component({
    selector: 'page-order-details',
    templateUrl: 'order-details.html',
    providers: [OrderDetailsService,OrdersService]

})
export class OrderDetailsPage {
    orderId: '';
    orderDetails: any = {};
    private review:any={};
    private loader:any;
    settingdata:any
    header:any
    buttonWhite:any
    AppIcon:any
    eventdates:any=[]
    CatTilte:any
    CatId:any
    selectedItem:any
    Eventdata:any[]=[]
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loadingCtrl:LoadingController,
                public service: Service,
                private orderService: OrdersService,
                public orderDetailsService: OrderDetailsService) {

                this.orderId = this.navParams.get('orderId')
                 console.log(this.navParams.data)
                 this.CatId = this.navParams.data.CatId
                 this.CatTilte = this.navParams.data.CatTilte
                this.getEventsDates()
                this.settingdata = JSON.parse(localStorage.getItem('headercolor'));
                    // this.header = { 'background-color': this.settingdata.headercolor, 'color': 'white' };
                    // this.buttonWhite = { 'color': 'white' };
                    // let Image = JSON.parse(localStorage.getItem('headerIcon'));
                    // console.log(Image)
                    // if(Image !== null){
                    //   this.AppIcon = Image[0]
                      
                    // }else{
                    //   this.AppIcon = "assets/img/xyram.png"
                     
                    // }
    }


    getEventsDates(){
        this.orderService.getCategory().subscribe(data=>{
              this.eventdates = data
              this.selectedItem = data[0]
              console.log(this.eventdates)
              this.displaycategoryData(this.eventdates[0], this.CatId)
        })
    }


    displaycategoryData(event:any,CatId:any){

        this.orderDetailsService.displayevent(event._id,CatId).subscribe(data=>{
            console.log(data)
            this.Eventdata = data

            for(let i=0;i<this.Eventdata.length;i++){
                console.log(this.Eventdata[i].startTime)
                if(this.Eventdata[i].startTime != undefined){
                    let hour = (this.Eventdata[i].startTime.split(':'))[0]
                       let min = (this.Eventdata[i].startTime.split(':'))[1]
                       let hour1 = +(this.Eventdata[i].startTime.split(':'))[0]
                       let part = +hour > 12 ? 'PM' : 'AM';
                       min = (min+'').length == 1 ? `0${min}` : min;
                       hour1 = +hour > 12 ? +hour - 12 : +hour;
                       console.log("hours",hour1)
                       let time2 = `${hour1}:${min} ${part}`
                       console.log("///")
                       console.log(time2)
                       this.Eventdata[i].startTime = time2  
                }
                if(this.Eventdata[i].endTime != undefined){
                    let hour = (this.Eventdata[i].endTime.split(':'))[0]
                       let min = (this.Eventdata[i].endTime.split(':'))[1]
                       let hour1 = +(this.Eventdata[i].endTime.split(':'))[0]
                       let part = +hour > 12 ? 'PM' : 'AM ';
                       min = (min+'').length == 1 ? `0${min}` : min;
                       hour1 = +hour > 12 ? +hour - 12 : +hour;
                       console.log("hours",hour1)
                       let time2 = `${hour1}:${min} ${part}`
                       console.log("///")
                       console.log(time2)
                       this.Eventdata[i].endTime = time2  
                }
            }
            
        })
    }


    listClick(event, newValue) {
        console.log(newValue);
        this.selectedItem = newValue;  // don't forget to update the model here
        // ... do other stuff here ...
        this.displaycategoryData(newValue,this.CatId)
    }

    ionViewDidEnter() {
        this.loader =this.loadingCtrl.create({
            content:'please wait'
        })
         this.loader.present();
         this.loader.dismiss();
        // this.orderDetailsService.getOrderDetails(this.orderId)
        //     .subscribe(order => {
        //         this.orderDetails = order;
        //         this.loader.dismiss();
        //         console.log("order-details-"+JSON.stringify(this.orderDetails));
        //        // this.getReviews();
        //     },error=>{
        //          this.loader.dismiss();
        //     })

    }

    private getReviews(){
          this.orderDetailsService.getRating(this.orderId)
            .subscribe(review=>{
                console.log("review-"+JSON.stringify(review));
                this.review=review;
                  this.loader.dismiss();
              // this.getRatings();
            
            })
    }

   private getRatings(){
         for (let i = 0; i < this.orderDetails.cart.length; i++) {
                for (let j = 0; j < this.review.length; j++) {
                 if(this.orderDetails.cart[i].productId==this.review[j].menuItem){
                   this.orderDetails.cart[i].rating=this.review[j].rating;
                   this.orderDetails.cart[i].ratingFlag=1;
                   this.orderDetails.cart[i].comment=this.review[j].comment;
                 }
               }
            } 
    }

    rate(itemId) {
        console.log("id---"+itemId);
        this.navCtrl.push("RatingPage",{
            itemId:itemId,
            orderId: this.orderId,
            review:this.review
        });
    }

    trackOrder() {
        this.navCtrl.push("OrderStatusPage",
            {orderId: this.orderId});
    }

    buyAgain(productId){
        this.navCtrl.push("ProductDetailsPage",{
            productId:productId
        })
    }
}
