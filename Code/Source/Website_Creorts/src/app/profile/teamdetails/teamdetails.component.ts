import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teamdetails',
  templateUrl: './teamdetails.component.html',
  styleUrls: ['./teamdetails.component.css']
})
export class TeamdetailsComponent implements OnInit {

  @Input() team : any;
  team2: any;
  userDetails = JSON.parse(localStorage.getItem('userdetails'));

  constructor() { }

  ngOnInit(): void {
    // for(let event of this.userDetails.AllTeamImages){
    //   if(event.EventID == this.team._id){
    //     for(let member of this.team.teamMembers){
    //       if(member.name == event.Name){
    //           member.url = event.URL;
    //       }
    //     }
    //   }
    // }
    // console.log("After Images ", this.team);
  }

}
