import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'Here are some notes...'
  };

  singleModel = "On";
  startDate: Date | undefined;
  startTime: Date = new Date();
  maxRating = 10;
  userRating = 0;
  isReadonly = false;
  userSettings: UserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]> = new Observable<string[]>();


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
  }



  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

  onHttpError(errorResponse: any){
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.value);

  //   if(form.valid){
  //   this.dataService.postUserSettingsForm(this.userSettings).subscribe({
  //     next: result => { console.log('success: ', result) },
  //     error: error => { this.onHttpError(error); }
  //   }
  //   );
  // }
  // else {
  //   this.postError = true;
  //   this.postErrorMessage = "Please fix the above errors";
  // }


  }
}
