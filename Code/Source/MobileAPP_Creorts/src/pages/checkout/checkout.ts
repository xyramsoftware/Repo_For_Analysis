import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage, LoadingController,AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {CheckoutService} from './checkout.service';
import {PayPal, PayPalPayment, PayPalConfiguration} from '@ionic-native/paypal';
import {Stripe} from '@ionic-native/stripe';
import {RegistrationService} from '../registration/registration.service';


const payPalEnvironmentSandbox = 'AcgkbqWGamMa09V5xrhVC8bNP0ec9c37DEcT0rXuh7hqaZ6EyHdGyY4FCwQC-fII-s5p8FL0RL8rWPRB';
const publishableKey = 'pk_test_mhy46cSOzzKYuB2MuTWuUb34';
const stripe_secret_key = 'sk_test_GsisHcPqciYyG8arVfVe2amE';

@IonicPage()
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html',
    providers: [CheckoutService, PayPal, Stripe,RegistrationService]
})
export class CheckoutPage {
    orderDetails: any = {};
    orderData: any = {
        address: {},
        cardDetails: {},
        status: 'pending'
    };
    loader1:any
    paymentevent:any=[]
    showCradBlock: boolean = false;
    paymentDetails: any = {
        paymentStatus: true
    };
    cardInfo: any = {};
    totlpayment:any=0
    updateevent:boolean
    public paymentTypes: any = [
                    {'default': false,'type': 'PayPal','value': 'paypal','logo': 'assets/img/paypal_logo.jpg'},
                    {'default': false, 'type': 'Stripe', 'value': 'stripe', 'logo': 'assets/img/stripe.png'},
                    {'default': true, 'type': 'COD', 'value': 'cod', 'logo': ''}];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public checkoutService: CheckoutService,
                public loadingCtrl: LoadingController,
                public alertCtrl:AlertController,
                public registrationService: RegistrationService,
                public payPal: PayPal,
                public stripe: Stripe) {

             this.orderData = this.navParams.get('orderdata');
             this.updateevent = this.navParams.get('update')
             console.log("order-data-"+JSON.stringify(this.orderData));
             this.paymentevent = this.orderData.paymentEvents
             for(let i=0;i<this.paymentevent.length;i++){
                 this.totlpayment = this.totlpayment + this.paymentevent[i].price
             }

             console.log(this.totlpayment)
    }

    ngOnInit() {
        this.orderData.paymentOption = 'COD';
    }

    choosePaymentType(paymentType){
     console.log("type-"+paymentType);
     this.orderData.paymentOption=paymentType;
     this.paymentDetails.paymentType=paymentType;
    }


    checkoutupdate(orderDetails: NgForm) {

        this.loader1 = this.loadingCtrl.create({
            content: 'please wait..'
        })
        this.loader1.present();

       this.orderData.cart = this.paymentevent
       this.checkoutService.updateUser(this.orderData._id,this.orderData).subscribe(data=>{
        this.loader1.dismiss()
          console.log(data)
          localStorage.setItem('userdetails', JSON.stringify(data));
        this.navCtrl.setRoot("ThankyouPage",{type:'update'});
  
       })
    }

    checkout(orderDetails: NgForm) {

            this.loader1 = this.loadingCtrl.create({
                content: 'please wait..'
            })
            this.loader1.present();

           this.orderData.cart = this.paymentevent
           this.registrationService.createUser(this.orderData).subscribe(data=>{
            this.loader1.dismiss()
              console.log(data)
      
            this.navCtrl.setRoot("ThankyouPage",{type:'reg'});
      
           })


        // if (this.orderData.paymentOption == 'PayPal') {
        //     const config = {
        //         PayPalEnvironmentProduction: '',
        //         PayPalEnvironmentSandbox: payPalEnvironmentSandbox
        //     }
        //     console.log("order-obj-" + JSON.stringify(this.orderData));
        //     this.checkoutService.placeOrder(this.orderData)
        //         .subscribe(order => {
        //             console.log("order-" + JSON.stringify(order));
        //             this.payPal.init(config).then(() => {
        //                 this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(() => {
        //                     let payment = new PayPalPayment(this.orderData.grandTotal, 'USD', 'Description', 'sale');
        //                     this.payPal.renderSinglePaymentUI(payment).then((success) => {
        //                        // this.paypalPayments =success;
        //                         console.log("payment_response-" + JSON.stringify(success));
        //                         this.paymentDetails.transactionId = success.response.id;
        //                         this.savePaymentData(order._id, this.paymentDetails);
        //                     }, (error) => {
        //                         console.error(error);
        //                     });
        //                 }, (error) => {
        //                     console.error(error);
        //                 })
        //             }, (error) => {
        //                 console.error(error);
        //             })
        //         })
        // } else if (this.orderData.paymentOption == 'Stripe') {

        //     if(this.orderData.grandTotal >= 50){

        //     let loader = this.loadingCtrl.create({
        //         content: 'please wait..'
        //     })
        //     loader.present();
        //     this.checkoutService.placeOrder(this.orderData)
        //         .subscribe(order => {
        //             this.stripe.setPublishableKey(publishableKey);
        //             let card = {
        //                 number: this.cardInfo.cardNumber,
        //                 expMonth: this.cardInfo.expiryMonth,
        //                 expYear: this.cardInfo.expiryYear,
        //                 cvc: this.cardInfo.cvc
        //             };
        //             this.stripe.createCardToken(card)
        //                   .then(token => {
        //                 let stripe_token: any = token;
        //                 if (token) {
        //                     console.log("source-token_"+JSON.stringify(stripe_token));
        //                     this.checkoutService.chargeStripe(stripe_token.id, "USD", Math.round(this.orderData.grandTotal), stripe_secret_key)
        //                             .then((result) => {
        //                                 console.log("stripe-result-"+JSON.stringify(result));
        //                                 let res: any = result;
        //                                 this.paymentDetails.transactionId = res.balance_transaction;
        //                                 loader.dismiss();
        //                                 this.cardInfo = '';
        //                                 this.savePaymentData(order._id, this.paymentDetails);
        //                             }, error => {
        //                                 console.log("error-"+JSON.stringify(error));
        //                                 loader.dismiss();
        //                             });
        //                     }
        //                 })
        //                 .catch(error => {
        //                     console.log(error);
        //                     loader.dismiss();
        //                     this.showAlert(error);
        //                 });
        //         }, error => {
        //             loader.dismiss();
        //         })
        // } else {
            
        //     this.showAlert('Amount should be greater than $50.');
        // }
        // } else {
        //     this.placeOrder();
        // }

    }

    placeOrder() {
        let loader = this.loadingCtrl.create({
            content: 'please wait'
        })
        loader.present();
        this.checkoutService.placeOrder(this.orderData)
            .subscribe(order => {
                loader.dismiss();
                localStorage.removeItem('cartItem');
                this.navCtrl.setRoot("ThankyouPage");
            }, error => {
                loader.dismiss();
            })
    }

    savePaymentData(orderId, paymentDetails) {
        this.checkoutService.savePaymentDetails(orderId, paymentDetails)
            .subscribe(response => {
                console.log("payment-"+JSON.stringify(response));
                localStorage.removeItem('cartItem');
                this.navCtrl.setRoot("ThankyouPage");
            },error=>{
               console.log("payment-errorr-"+JSON.stringify(error)); 
            })
    }

    showAlert(message){
      let alert = this.alertCtrl.create({
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
   }


}
