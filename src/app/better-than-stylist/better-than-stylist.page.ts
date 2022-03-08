import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { DatabaseService } from '../api/database.service';
@Component({
  selector: 'app-better-than-stylist',
  templateUrl: './better-than-stylist.page.html',
  styleUrls: ['./better-than-stylist.page.scss'],
})
export class BetterThanStylistPage implements OnInit {
  firstName: string;
  lastName: string;
  year: number;
  gender: string;
  musicPlatform: any;
  language = 'Turkish';
  languages = {
    Home: { Turkish: 'Anasayfa', English: 'Home' },
    Profile: { Turkish: 'Profil', English: 'Profile' },
    FirstName: { Turkish: 'Ad', English: 'First Name' },
    LastName: { Turkish: 'Soyad', English: 'Last Name' },
    YearOfBirth: { Turkish: 'Doğum yılı', English: 'Year of Birth' },
    Gender: { Turkish: 'Cinsiyet', English: 'Gender' },
    Male: { Turkish: 'Erkek', English: 'Male' },
    Female: { Turkish: 'Kadın', English: 'Female' },
    MusicPlatform: { Turkish: 'Muzik Platformu', English: 'Music Platform' },
    language: { Turkish: 'Dil', English: 'language' },
    Turkish: { Turkish: 'Türkçe', English: 'Turkish' },
    English: { Turkish: 'İngilizce', English: 'English' },
    Save: { Turkish: 'Kaydet', English: 'Save' },
  };

  constructor(private menu: MenuController, private db: DatabaseService) {
    /*
    db.getUserCount().then((result) => {
      this.firstName = result.rows.item(0).firstName;
      this.lastName = result.rows.item(0).lastName;
      this.year = result.rows.item(0).age;
      this.gender = result.rows.item(0).gender;
      this.musicPlatform = result.rows.item(0).musicPlatform;
      this.language = result.rows.item(0).language;
    });
    */
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  closeMenu() {
    this.menu.close();
  }

  ngOnInit() {}

  update() {
    this.db.updateUsers(
      this.firstName,
      this.lastName,
      this.year,
      this.gender,
      this.musicPlatform,
      this.language
    );
  }
}
