import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { DatabaseService } from '../api/database.service';
import { WeatherService } from '../api/weather.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


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
  language: string;

  sunrise: any;
  sunSet: any;
  windSpeed: any;
  weatherDesc: string;
  city: string;
  lat: number;
  long: number;
  time: any;
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
    Sunrise: { Turkish: 'Gün Batımı', English: 'Sunrise' },
    SunSet: { Turkish: 'Gün Doğumu', English: 'SunSet' },
    WindSpeed: { Turkish: 'Rüzgar Hızı', English: 'WindSpeed' },
    WeatherDesc: { Turkish: 'Hava Durumu', English: 'WeatherDesc' },
    City: { Turkish: 'Şehir', English: 'City' }
    
  };

  constructor(
    private menu: MenuController,
    private db: DatabaseService,
    private geoLocation: Geolocation,
    private weather: WeatherService,
    private androidPermissions: AndroidPermissions
  ) {
    /*
    db.getUser().then((result) => {
      this.firstName = result.rows.item(0).firstName;
      this.lastName = result.rows.item(0).lastName;
      this.year = result.rows.item(0).age;
      this.gender = result.rows.item(0).gender;
      this.musicPlatform = result.rows.item(0).musicPlatform;
      this.language = result.rows.item(0).language;
    });
    */

    this.getLocation();
  } 
  deneme(){
    
    this.db.sendMsg("asda"+this.city);

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
  getLocation() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then((result)=>{
      if(result.hasPermission==false  && this.city==undefined)
      {
        this.db.sendMsg("Please accept location permissions or you can entry by city name");
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION);    
      }
      else{
        this.geoLocation
      .getCurrentPosition({timeout:10000,enableHighAccuracy:true})
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;

        this.weather
          .getWeatherByCoord(this.lat, this.long)
          .subscribe((havadurumu) => {
            this.db.sendMsg(havadurumu);

            this.weatherDesc = havadurumu['weather'][0]['main'];
            this.sunSet = havadurumu['sys']['sunset'];
            this.sunrise = havadurumu['sys']['sunrise'];
            this.windSpeed = havadurumu['wind']['speed'];

            console.log(
              this.weatherDesc,
              this.sunrise,
              this.sunSet,
              this.windSpeed
            );

            var sunSetDate = new Date(this.sunSet * 1000);
            this.sunSet = sunSetDate.getHours() + ' ' + sunSetDate.getMinutes();

            var sunRiseDate = new Date(this.sunrise * 1000);
            this.sunrise =
              sunRiseDate.getHours() + ' ' + sunRiseDate.getMinutes();

            this.time = new Date();

            this.time = this.time.getHours() + ' ' + this.time.getMinutes();
            console.log(this.sunSet, this.sunrise, this.time);
          });
      })
      .catch((error) => {
        this.db.sendMsg( JSON.stringify(error));
      });
      }
    },(err)=>{this.db.sendMsg("Please accept location permissions or you can entry by city name");})
    
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    this.getLocation();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
}
