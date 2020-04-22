import { Component } from "@angular/core";
import { IonicPage, AlertController, NavController, PopoverController, ToastController } from "ionic-angular";
import { CartService } from './cart.service';
import { ConstService } from "../../providers/const-service";
import { useAnimation } from "@angular/core/src/animation/dsl";

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [CartService]
})
export class CartPage {

  UserDetails: any = {}
  ProfileUrl: any
  IdentityUrl: any
  QrCode: any
  details: any = []
  displaydata: any = []
  AppIcon: any
  header: any
  buttonWhite: any
  imageUrl: any
  settingdata: any
  selectedeventlist: any
  teamList: any = []
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public constService: ConstService,
    public toastCtrl: ToastController,
    private cartService: CartService) {
  }

  ngOnInit() {
    this.UserDetails = JSON.parse(localStorage.getItem('userdetails'));
    console.log(this.UserDetails)
    console.log(this.UserDetails.teamReg)


    this.selectedeventlist = this.UserDetails.QREvents.join(',');
    console.log(this.selectedeventlist)

    this.getImage(this.UserDetails)

    console.log(this.displaydata)

  }


  // http://localhost:3000/api/users/downloadQR/5dc41158a7280e1990e68f7c?RegisterId=ISCA1072fm01&qr_code_file_name=1573130584425.png
  getImage(UserDetails: any) {
    //this.ProfileUrl  = this.constService.base_url+"api/users/downloadProfile/"+UserDetails._id+"?RegisterId="+UserDetails.RegisterId+"&profileImg="+UserDetails.profileImg
    //this.IdentityUrl = this.constService.base_url+"api/users/downloadIdentity/"+UserDetails._id+"?RegisterId="+UserDetails.RegisterId+"&identityImg="+UserDetails.identityImg
    this.QrCode = this.constService.base_url + "api/users/QrImg/?RegisterId=" + this.UserDetails.RegisterId + "&QRImg=" + UserDetails.QRImg
    console.log(this.QrCode)




  }


  displayteamlist(event: any) {


    console.log(event)
    this.teamList = []
    for (let i = 0; i < this.UserDetails.AllTeamImages.length; i++) {
      if (event._id == this.UserDetails.AllTeamImages[i].EventID) {
        this.teamList.push(this.UserDetails.AllTeamImages[i])
      }
    }

    console.log(this.teamList)
    this.navCtrl.push("AddressPage", { eventdata: event, teamdata: this.teamList })

  }



}
