import { Component } from '@angular/core';
import { DatabaseService } from '../api/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  languages = {
    FirstName: { Turkish: 'Ad', English: 'First Name',German:"Vorname", French:"Prénom", Spanish:"Prénom",Chinese:"名" },
    LastName: { Turkish: 'Soyad', English: 'Last Name',German:"Nachname", French:"Nom de famille", Spanish:"Nom de famille",Chinese:"姓" },
    YearOfBirth: { Turkish: 'Doğum yılı', English: 'Year of Birth',German:"Geburtsjahr", French:"Année de naissance", Spanish:"Année de naissance",Chinese:"出生年份" },
    Gender: { Turkish: 'Cinsiyet', English: 'Gender',German:"Geschlecht", French:"Le sexe", Spanish:"Le sexe",Chinese:"性别" },
    Male: { Turkish: 'Erkek', English: 'Male',German:"Männlich", French:"Homme", Spanish:"Homme",Chinese:"男性" },
    Female: { Turkish: 'Kadın', English: 'Female',German:"Weiblich", French:"Femme", Spanish:"Femme",Chinese:"女性" },
    MusicPlatform: { Turkish: 'Muzik Platformu', English: 'Music Platform',German:"Musik Plattform", French:"Plateforme musicale", Spanish:"Plateforme musicale",Chinese:"音乐平台" },
    Save: { Turkish: 'Kaydet', English: 'Save',German:"Speichern", French:"sauvegarder", Spanish:"sauvegarder",Chinese:"保存" },update:{Turkish:"Güncelle", English:"Update",German:"Aktualisieren", French:"Mettre à jour", Spanish:"Mettre à jour",Chinese:"更新"},
  };
  firstName: string;
  lastName: string;
  year: number;
  gender: string;
  musicPlatform: any;
  language: string;

  constructor(
    private db: DatabaseService) 
  {
      this.db.getUser().then((result) => {
        this.firstName = result.rows.item(0).firstName;
        this.lastName = result.rows.item(0).lastName;
        this.year = result.rows.item(0).age;
        this.gender = result.rows.item(0).gender;
        this.musicPlatform = result.rows.item(0).musicPlatform.split(",");
        this.language = result.rows.item(0).language;
      });
  }
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
