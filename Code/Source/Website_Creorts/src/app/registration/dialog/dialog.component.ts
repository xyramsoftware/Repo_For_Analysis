import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/Models/player.model';
export interface DialogData {
  eventdata: [];
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  public selfForm: FormGroup;
  public teamForm: FormGroup;
  public teamMembersForm: FormArray;
  players: any = [{}]
  extraIngredients: [{}]
  loading: boolean;
  playersList: any = [{}]

  teamdetails: any = {}
  eventdata: any = [];
  events: any = {}
  daaata: string;
  teamStrenth: boolean;
  today = new Date();
  minAge = 5;
  ageLimit = new Date(this.today.getFullYear() - this.minAge, this.today.getMonth(), this.today.getDate()).toISOString().split('T')[0];

  constructor(
    private http: Http,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {


    this.teamForm = this.fb.group({
      TeamName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      TeamCaptain: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      teamMembers: this.fb.array([])

    });
    this.onDefaults();
  }

  private playerForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      Mobile: ['', [Validators.required, Validators.pattern('^[0-9_-]{10}')]],
      DOB: ['', Validators.required],
      position: ['', [Validators.required]]
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onDefaults() {
    let playerArr = this.teamForm.controls.teamMembers as FormArray;
    let playerArrLen = playerArr.length;
    playerArr.insert(playerArrLen, this.playerForm());

  }
  onAddPlayer(i: number): void {
    this.onDefaults();
    this.teamStrenth = false;
    i = 1;
    i++;
  }

  onRemovePlayer(i: number): void {
    let playerArr = this.teamForm.controls.teamMembers as FormArray;
    playerArr.removeAt(i);
  }

  save() {
    if (this.teamForm.valid) {
      console.log(this.teamForm.value);
      console.log(this.events)
      this.loading = true;
      for (let player of this.teamForm.value.teamMembers) {
        player.mobile = '91' + player.mobile;
      }

      console.log(this.teamForm.value);
      this.teamdetails = this.teamForm.value

      this.events.teamdetails = this.teamdetails
      console.log('events: ', this.events);
      if (this.teamdetails.teamMembers.length < this.events.teamSize) {
        this.teamStrenth = true
        this.loading = false;
      }
      else {
        this.teamStrenth = false
        localStorage.setItem('Events', JSON.stringify(this.events));
        this.dialogRef.close({ isClose: false });
      }
    }
    else {
      this.markFormGroupTouched(this.teamForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  close() {
    this.daaata = 'dialogeclosed';
    this.dialogRef.close({ isClose: true });
  }

  addNew = function () {
    var newItemNo = this.teamMembers.length + 1;
    this.players.push({});
  };
  delete = function () {
    if (this.players.length > 0) {
      var lastItem = this.teamMembers.length - 1;
      this.players.splice(lastItem);
    }
  }
  ngOnInit(): void {
    console.log(this.eventdata);
    this.events = JSON.parse(localStorage.getItem('Events'))
    console.log(this.events)
  }

}
