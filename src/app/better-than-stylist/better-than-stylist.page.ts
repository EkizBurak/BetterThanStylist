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
  sunset: any;
  windSpeed: any;
  weatherDesc: string;
  city: string;
  lat: number;
  long: number;
  time: any;
  weatherIcon:string;
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
    Sunset: { Turkish: 'Gün Doğumu', English: 'SunSet' },
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
    
    db.getUser().then((result) => {
      this.firstName = result.rows.item(0).firstName;
      this.lastName = result.rows.item(0).lastName;
      this.year = result.rows.item(0).age;
      this.gender = result.rows.item(0).gender;
      this.musicPlatform = result.rows.item(0).musicPlatform;
      this.language = result.rows.item(0).language;
    });
    
    
    this.getLocation();
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
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
        
        this.weather
          .getWeatherByCoord(this.lat, this.long)
          .then((weatherApi) => {

            this.weatherDesc = weatherApi['weather'][0]['description'];
            this.sunset = weatherApi['sys']['sunset'];
            this.sunrise = weatherApi['sys']['sunrise'];
            this.city=weatherApi['name'];
            this.windSpeed = weatherApi['wind']['speed'];

            var sunSetDate = new Date(this.sunset * 1000);
            
            this.sunset = sunSetDate.getHours() + ' ' + sunSetDate.getMinutes();
            
            
            if (this.sunset.length<5)
            {
              if(this.sunset.split(" ")[0].length<2)
              {
                this.sunset="0"+this.sunset.split(" ")[0]+ " " + this.sunset.split(" ")[1];
              }
              if(this.sunset.split(" ")[1].length<2)
              {
                this.sunset=this.sunset.split(" ")[0]+ " " + "0" +this.sunset.split(" ")[1];
              }
            }
            
            var sunRiseDate = new Date(this.sunrise * 1000);
            
            this.sunrise =
              sunRiseDate.getHours() + ' ' + sunRiseDate.getMinutes();

            if (this.sunrise.length<5)
            {
              if(this.sunrise.split(" ")[0].length<2)
              {
                this.sunrise="0"+this.sunrise.split(" ")[0]+ " " + this.sunrise.split(" ")[1];
              }
              if(this.sunrise.split(" ")[1].length<2)
              {
                this.sunrise=this.sunrise.split(" ")[0]+ " " + "0" +this.sunrise.split(" ")[1];
              }
            }
            
            this.time = new Date();

            this.time = this.time.getHours() + ' ' + this.time.getMinutes();
           
          });
      })
      .catch((error) => {
        this.db.sendMsg(JSON.stringify(error));
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
