import { Component } from '@angular/core';
import { DatabaseService } from '../app/api/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  firstName: string;
  lastName: string;
  year: number;
  gender: string;
  musicPlatform: any;
  language: string;
  termsAndConditions: any;
  userCount: any;
  constructor(private dbService: DatabaseService) {
    //this.userCount = this.dbService.getUserCount();
  }

  deneme() {
    if (
      this.termsAndConditions == false ||
      this.termsAndConditions == undefined
    ) {
      console.log('You need to accept terms and conditions');
      this.dbService.sendMsg('You need to accept terms and conditions');
    } else {
      if (this.firstName == undefined || this.firstName == '') {
        console.log('Firstname Cannot Be Blank!');
        this.dbService.sendMsg('Firstname Cannot Be Blank!');
      } else if (this.lastName == undefined || this.lastName == '') {
        console.log('lastName Cannot Be Blank!');
        this.dbService.sendMsg('lastName Cannot Be Blank!');
      } else if (this.year == undefined) {
        console.log('year Cannot Be Blank!', this.year);
        this.dbService.sendMsg('year Cannot Be Blank!');
      } else if (this.year < 1900) {
        console.log('The year cannot be less than 1900!', this.year);
        this.dbService.sendMsg('The year cannot be less than 1900!');
      } else if (this.year > 2022) {
        console.log('The year cannot be more than 2022!', this.year);
        this.dbService.sendMsg('The year cannot be greater than 2022!');
      } else if (this.gender == undefined) {
        console.log('gender Cannot Be Blank!');
        this.dbService.sendMsg('gender Cannot Be Blank!');
      } else if (this.musicPlatform == undefined) {
        console.log('musicPlatform Cannot Be Blank!');
        this.dbService.sendMsg('musicPlatform Cannot Be Blank!');
      } else if (this.language == undefined) {
        console.log('language Cannot Be Blank!');
        this.dbService.sendMsg('language Cannot Be Blank!');
      } else {
        console.log(this.musicPlatform);
        this.dbService.createUser(
          this.firstName,
          this.lastName,
          this.year,
          this.gender,
          this.musicPlatform,
          this.language
        );
      }
    }
  }
}
