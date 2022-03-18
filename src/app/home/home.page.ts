import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../api/database.service';

@Component({
  selector: 'app-home',

  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  firstName: string;
  lastName: string;
  year: number;
  gender: string;
  musicPlatform: any;
  language: string;
  termsAndConditions: any;
  
  constructor(private dbService: DatabaseService, private router: Router) {}

  deneme() {
    if (
      this.termsAndConditions == false ||
      this.termsAndConditions == undefined
    ) {
      this.dbService.sendMsg('You need to accept terms and conditions');
    } else {
      if (this.firstName == undefined || this.firstName == '') {
        this.dbService.sendMsg('Firstname Cannot Be Blank!');
      } else if (this.lastName == undefined || this.lastName == '') {
        this.dbService.sendMsg('lastName Cannot Be Blank!');
      } else if (this.year == undefined) {
        this.dbService.sendMsg('year Cannot Be Blank!');
      } else if (this.year < 1900) {
        this.dbService.sendMsg('The year cannot be less than 1900!');
      } else if (this.year > 2022) {
        this.dbService.sendMsg('The year cannot be greater than 2022!');
      } else if (this.gender == undefined) {
        this.dbService.sendMsg('gender Cannot Be Blank!');
      } else if (this.musicPlatform == undefined) {
        this.dbService.sendMsg('musicPlatform Cannot Be Blank!');
      } else if (this.language == undefined) {
        this.dbService.sendMsg('language Cannot Be Blank!');
      } else {
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
