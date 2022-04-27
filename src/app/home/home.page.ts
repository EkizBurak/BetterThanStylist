import { Component } from '@angular/core';
import { DatabaseService } from '../api/database.service';
import { Platform } from '@ionic/angular';
import { WeatherService } from '../api/weather.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';

@Component({
  selector: 'app-home',

  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  languages = {
   Sunrise: { Turkish: 'Gün Batımı', English: 'Sunrise',German:"Sonnenaufgang", French:"lever du soleil", Spanish:"lever du soleil",Chinese:"日出" },
Sunset: { Turkish: 'Gün Doğumu', English: 'Sunset',German:"Sonnenuntergang", French:"Le coucher du soleil", Spanish:"Le coucher du soleil",Chinese:"日落" },
WindSpeed: { Turkish: 'Rüzgar Hızı', English: 'Wind Speed',German:"Windgeschwindigkeit", French:"Vitesse du vent", Spanish:"Vitesse du vent",Chinese:"风速" },
City: { Turkish: 'Şehir', English: 'City',German:"Stadt", French:"Ville", Spanish:"Ville",Chinese:"城市" },
thunderstormwithlightrain: { Turkish: 'Hafif Yağmurlu Fırtına', English: 'Thunderstorm With Light Rain' ,German:"Gewitter mit leichtem Regen", French:"Orage avec pluie légère", Spanish:"Orage avec pluie légère",Chinese:"有小雨的雷暴"},
thunderstormwithrain	: { Turkish: 'Yağmurlu Fırtına', English: 'Thunderstorm With Rain',German:"Gewitter mit Regen", French:"Orage avec pluie", Spanish:"Orage avec pluie",Chinese:"有雨的雷暴" },
thunderstormwithheavyrain	: { Turkish: 'Şiddetli Yağmurlu Fırtına', English: 'Thunderstorm With Heavy Rain',German:"Gewitter mit starkem Regen", French:"Orage avec de fortes pluies", Spanish:"Orage avec de fortes pluies",Chinese:"雷暴与大雨" },
lightthunderstorm	: { Turkish: 'Hafif Fırtına', English: 'Light Thunderstorm',German:"Leichtes Gewitter", French:"Orage léger", Spanish:"Orage léger",Chinese:"轻微雷暴" },
thunderstorm	: { Turkish: 'Fırtına', English: 'Thunderstorm',German:"Gewitter", French:"Orage", Spanish:"Orage",Chinese:"雷雨" },
heavythunderstorm	: { Turkish: 'Şiddetli Fırtına', English: 'Heavy Thunderstorm',German:"Schweres Gewitter", French:"Orage violent", Spanish:"Orage violent",Chinese:"强雷暴" },
raggedthunderstorm	: { Turkish: 'Düzensiz Fırtına', English: 'Ragged Thunderstorm',German:"Gewitter", French:"Orage déchiqueté", Spanish:"Orage déchiqueté",Chinese:"衣衫褴褛的雷暴" },
thunderstormwithlightdrizzle	: { Turkish: 'Hafif Çiseleyen Fırtına', English: 'Thunderstorm With Light Drizzle',German:"Gewitter mit leichtem Nieselregen", French:"Orage avec bruine légère", Spanish:"Orage avec bruine légère",Chinese:"有小毛毛雨的雷暴" },
thunderstormwithdrizzle	: { Turkish: 'Çiseleyen Fırtına', English: 'Thunderstorm With Drizzle',German:"Gewitter mit Nieselregen", French:"Orage avec bruine", Spanish:"Orage avec bruine",Chinese:"有毛毛雨的雷暴" },
thunderstormwithheavydrizzle	: { Turkish: 'Şiddetli Çiseleyen Fırtına', English: 'Thunderstorm With Heavy Drizzle',German:"Gewitter mit starkem Nieselregen", French:"Orage avec forte bruine", Spanish:"Orage avec forte bruine",Chinese:"有大毛毛雨的雷暴" },
lightintensitydrizzle	: { Turkish: 'Hafif Yoğunlukta Çiseleme', English: 'Light Intensity Drizzle',German:"Leichter Nieselregen", French:"Bruine d'intensité légère", Spanish:"Bruine d'intensité légère",Chinese:"轻度细雨" },
drizzle	: { Turkish: 'Çiseleme', English: 'Drizzle',German:"Nieselregen", French:"Bruine", Spanish:"Bruine",Chinese:"细雨" },
heavyintensitydrizzle	: { Turkish: 'Şiddetli Çiseleme', English: 'Heavy Intensity Drizzle',German:"Starker Nieselregen", French:"Bruine de forte intensité", Spanish:"Bruine de forte intensité",Chinese:"大强度毛毛雨" },
lightintensitydrizzlerain	: { Turkish: 'Hafif Yoğunlukta Çiseleyen Yağmur', English: 'Light Intensity Drizzle Rain',German:"Leichter Nieselregen", French:"Intensité légère Bruine Pluie", Spanish:"Intensité légère Bruine Pluie",Chinese:"轻度细雨" },
drizzlerain	: { Turkish: 'Çiseleyen Yağmur', English: 'Drizzle Rain',German:"Nieselregen", French:"Bruine Pluie", Spanish:"Bruine Pluie",Chinese:"细雨" },
heavyintensitydrizzlerain	: { Turkish: 'Şiddetli Çiseleyen Yağmur', English: 'Heavy Intensity Drizzle Rain',German:"Starker Nieselregen", French:"Pluie de bruine de forte intensité", Spanish:"Pluie de bruine de forte intensité",Chinese:"大强度毛毛雨" },
showerrainanddrizzle	: { Turkish: 'Duş Yağmuru ve Çiseleme', English: 'Shower Rain and Drizzle',German:"Regenschauer und Nieselregen", French:"Pluie et bruine", Spanish:"Pluie et bruine",Chinese:"阵雨和毛毛雨" },
heavyshowerrainanddrizzle	: { Turkish: 'Şiddetli Duş Yağmuru ve Çiseleme', English: 'Heavy Shower Rain and Drizzle',German:"Starker Regenschauer und Nieselregen", French:"Forte averse de pluie et", Spanish:"Forte averse de pluie et",Chinese:"大阵雨和" },
showerdrizzle	: { Turkish: 'Duş Çiselemesi', English: 'Shower Drizzle',German:"Dusche Nieselregen", French:"Bruine de douche", Spanish:"Bruine de douche",Chinese:"淋浴细雨" },
lightrain	: { Turkish: 'Hafif Yağmur', English: 'Light Rain',German:"Leichter Regen", French:"Pluie légère", Spanish:"Pluie légère",Chinese:"小雨" },
moderaterain	: { Turkish: 'Ilımlı Yağmur', English: 'Moderate Rain',German:"Mäßiger Regen", French:"Pluie modérée", Spanish:"Pluie modérée",Chinese:"中雨" },
heavyintensityrain	: { Turkish: 'Şiddetli Yağmur', English: 'Heavy Intensity Rain',German:"Starker Regen", French:"Pluie de forte intensité", Spanish:"Pluie de forte intensité",Chinese:"强降雨" },
veryheavyrain	: { Turkish: 'Çok şiddetli yağmur', English: 'Very Heavy Rain',German:"Sehr schwerer Regen", French:"Pluie très forte", Spanish:"Pluie très forte",Chinese:"非常大的雨" },
extremerain	: { Turkish: 'Aşırı şiddetli yağmur', English: 'Extreme Rain',German:"Extremer Regen", French:"Pluie extrême", Spanish:"Pluie extrême",Chinese:"极端雨" },
freezingrain	: { Turkish: 'Dondurucu Yağmur', English: 'Freezing Rain',German:"Gefrierender Regen", French:"Pluie verglaçante", Spanish:"Pluie verglaçante",Chinese:"冻雨" },
lightintensityshowerrain	: { Turkish: 'Hafif Yoğunlukta Duş Yağmuru', English: 'Light Intensity Shower Rain',German:"Leichter Regenschauer", French:"Pluie de douche d'intensité lumineuse", Spanish:"Pluie de douche d'intensité lumineuse",Chinese:"小强度阵雨" },
showerrain	: { Turkish: 'Duş Yağmuru', English: 'Shower Rain',German:"Dusche Regen", French:"Pluie de douche", Spanish:"Pluie de douche",Chinese:"阵雨" },
heavyintensityshowerrain	: { Turkish: 'Şiddetli Duş Yağmuru', English: 'Heavy Intensity Shower Rain',German:"Starker Schauerregen", French:"Pluie de pluie de forte intensité", Spanish:"Pluie de pluie de forte intensité",Chinese:"强阵雨" },
raggedshowerrain	: { Turkish: 'Düzensiz Duş Yağmuru', English: 'Ragged Shower Rain',German:"Gezackter Schauerregen", French:"Pluie de douche irrégulière", Spanish:"Pluie de douche irrégulière",Chinese:"衣衫褴褛的阵雨" },
lightsnow	: { Turkish: 'Hafif Kar', English: 'Light Snow',German:"Leichter Schnee", French:"Neige légère", Spanish:"Neige légère",Chinese:"小雪" },
snow	: { Turkish: 'Kar', English: 'Snow',German:"Schnee", French:"Neiger", Spanish:"Neiger",Chinese:"雪" },
heavysnow	: { Turkish: 'Yoğun kar yağışı', English: 'Heavy Snow',German:"Starker Schneefall", French:"Beaucoup de neige", Spanish:"Beaucoup de neige",Chinese:"暴雪" },
sleet: { Turkish: 'Sulu kar', English: 'Sleet',German:"Schneeregen", French:"Neige fondue", Spanish:"Neige fondue",Chinese:"霰" },
lightshowersleet	: { Turkish: 'Karla Karışık Hafif Yağmur', English: 'Light Shower Sleet',German:"Leichter Regenschauer", French:"Légère pluie de grésil", Spanish:"Légère pluie de grésil",Chinese:"轻雨夹雪" },
showersleet	: { Turkish: 'Karla Karışık Yağmur', English: 'Shower Sleet',German:"Regenschauer", French:"Douche grésil", Spanish:"Douche grésil",Chinese:"雨夹雪" },
lightrainandsnow	: { Turkish: 'Karla Karışık Hafif Yağmur', English: 'Light Rain and Snow',German:"Leichter Regen und Schnee", French:"Pluie légère et neige", Spanish:"Pluie légère et neige",Chinese:"小雨和小雪" },
rainandsnow	: { Turkish: 'Karla Karışık Yağmur', English: 'Rain and Snow',German:"Regen und Schnee", French:"Pluie et neige", Spanish:"Pluie et neige",Chinese:"雨雪" },
lightshowersnow	: { Turkish: 'Karla Karışık Hafif Yağmur', English: 'Light Shower Snow',German:"Leichter Schauer Schnee", French:"Légère averse de neige", Spanish:"Légère averse de neige",Chinese:"小阵雨雪" },
showersnow	: { Turkish: 'Sulu kar', English: 'Shower Snow',German:"Dusche Schnee", French:"Douche Neige", Spanish:"Douche Neige",Chinese:"阵雨雪" },
heavyshowersnow	: { Turkish: 'Şiddetli Kar', English: 'Heavy Shower Snow',German:"Starker Schneeschauer", French:"Forte averse de neige", Spanish:"Forte averse de neige",Chinese:"大阵雨雪" },
ash: { Turkish: 'Kül', English: 'Ash',German:"Asche", French:"Cendre", Spanish:"Cendre",Chinese:"灰" },
clear: { Turkish: 'Açık Hava', English: 'Clear',German:"Klar", French:"Dégager", Spanish:"Dégager",Chinese:"清除" },
clouds: { Turkish: 'Bulutlu', English: 'Clouds',German:"Wolken", French:"Des nuages", Spanish:"Des nuages",Chinese:"云" },
rain: { Turkish: 'Yağmurlu', English: 'Rain',German:"Regen", French:"Pluie", Spanish:"Pluie",Chinese:"雨" },
squall: { Turkish: 'Fırtına', English: 'Squall',German:"Bö", French:"Bourrasque", Spanish:"Bourrasque",Chinese:"飑" },
mist: { Turkish: 'Sis', English: 'Mist',German:"Nebel", French:"Brume", Spanish:"Brume",Chinese:"薄雾" },
smoke: { Turkish: 'Sis', English: 'Smoke',German:"Nebel", French:"Fumée", Spanish:"Fumée",Chinese:"抽烟" },
haze: { Turkish: 'Pus', English: 'Haze',German:"Dunst", French:"Brume", Spanish:"Brume",Chinese:"阴霾" },
fog: { Turkish: 'Sis', English: 'Fog' ,German:"Nebel", French:"Brouillard", Spanish:"Brouillard",Chinese:"多雾路段"},
sand: { Turkish: 'Kum', English: 'Sand',German:"Sand", French:"Sable", Spanish:"Sable",Chinese:"沙" },
dust	: { Turkish: 'Toz', English: 'Dust',German:"Staub", French:"Poussière", Spanish:"Poussière",Chinese:"灰尘" },
volcanicash	: { Turkish: 'Volkanik Kül', English: 'Volcanic ash',German:"Vulkanasche", French:"Cendre volcanique", Spanish:"Cendre volcanique",Chinese:"火山灰" },
squalls	: { Turkish: 'Fırtına', English: 'Squalls',German:"Sturmböen", French:"Grains", Spanish:"Grains",Chinese:"暴风雨" },
tornado	: { Turkish: 'Kasırga', English: 'Tornado',German:"Tornado", French:"Tornade", Spanish:"Tornade",Chinese:"龙卷风" },
clearsky	: { Turkish: 'Açık hava', English: 'Clear sky',German:"Klarer Himmel", French:"Ciel clair", Spanish:"Ciel clair",Chinese:"晴朗的天空" },
fewclouds	: { Turkish: 'Bulutlu', English: 'Few Clouds',German:"Ein paar Wolken", French:"Quelques nuages", Spanish:"Quelques nuages",Chinese:"几朵云" },
scatteredclouds: { Turkish: 'Dağınık Bulutlu', English: 'Scattered Clouds',German:"Aufgelockerte Bewölkung", French:"Nuages dispersés", Spanish:"Nuages dispersés",Chinese:"疏云，零星散落的云朵"},
brokenclouds: { Turkish: 'Parçalı Bulutlu', English: 'Broken Clouds',German:"Aufgelockert bewölkt", French:"Nuages brisés", Spanish:"Nuages brisés",Chinese:"碎云" },
overcastclouds	: { Turkish: 'Parçalı Bulutlu', English: 'Overcast Clouds',German:"Bedeckte Wolken", French:"Nuages couverts", Spanish:"Nuages couverts",Chinese:"阴云密布"},

  };
  firstName: string;
  lastName: string;
  year: number;
  gender: string;
  musicPlatform: any;
  language: string;
  termsAndConditions: any;
  userCount:number;
  sunrise: any;
  sunset: any;
  windSpeed: any;
  weatherMain:string;
  weatherDesc: string;
  city: string;
  lat: number;
  long: number;
  time: any;
  weatherIcon:string;
  weatherTemp:number;
  alert=[];


  constructor(
    private db: DatabaseService,
    public platform: Platform,
    private geoLocation: Geolocation,
    private weather: WeatherService,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,) 
  {
    
    platform.ready().then(() => 
    {
      
      this.db.getUser().then((result) => {
        
        this.userCount = result.rows.length;
        if (this.userCount>=1)
        {
          this.firstName = result.rows.item(0).firstName;
          this.lastName = result.rows.item(0).lastName;
          this.year = result.rows.item(0).age;
          this.gender = result.rows.item(0).gender;
          this.musicPlatform = result.rows.item(0).musicPlatform.split(",");
          this.language = result.rows.item(0).language;
          this.getLocation();
        }

       
      });
    }).catch((e)=>{this.db.sendMsg(e);});
  }

  createUser() {
    if (
      this.termsAndConditions == false ||
      this.termsAndConditions == undefined
    ) {
      this.db.sendMsg('You need to accept terms and conditions');
    } else {
      if (this.firstName == undefined || this.firstName == '') {
        this.db.sendMsg('Firstname Cannot Be Blank!');
      } else if (this.lastName == undefined || this.lastName == '') {
        this.db.sendMsg('lastName Cannot Be Blank!');
      } else if (this.year == undefined) {
        this.db.sendMsg('year Cannot Be Blank!');
      } else if (this.year < 1900) {
        this.db.sendMsg('The year cannot be less than 1900!');
      } else if (this.year > 2022) {
        this.db.sendMsg('The year cannot be greater than 2022!');
      } else if (this.gender == undefined) {
        this.db.sendMsg('gender Cannot Be Blank!');
      } else if (this.musicPlatform == undefined) {
        this.db.sendMsg('musicPlatform Cannot Be Blank!');
      } else if (this.language == undefined) {
        this.db.sendMsg('language Cannot Be Blank!');
      } else {
        this.userCount=this.db.createUser(
          this.firstName,
          this.lastName,
          this.year,
          this.gender,
          this.musicPlatform,
          this.language
        );
        this.getLocation();
      }
    }
  }
  getLocation() {
    
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then((result)=>{
      if(result.hasPermission==false)
      {
        this.db.sendMsg("Please accept location permissions or you can entry by city name");
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(()=>
        {
          this.getLocation();
        });    
        
        this.db.sendMsg("Please accept location permissions or you can entry by city name");
      }
      else{
        this.diagnostic.isLocationEnabled().then((result)=>
        {
          if(result==false)
          {
              this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
              this.getLocation();
          }
          else
          {
            this.geoLocation
            .getCurrentPosition()
            .then((resp) => 
            {
              this.lat = resp.coords.latitude;
              this.long = resp.coords.longitude;
             
              this.weather
                .getWeatherByCoord(this.lat, this.long)
                .then((weatherApi) => {
      
                  this.weatherMain= weatherApi['weather'][0]['main']
                  this.weatherDesc = weatherApi['weather'][0]['description'];
                  this.sunset = weatherApi['sys']['sunset'];
                  this.sunrise = weatherApi['sys']['sunrise'];
                  this.city=weatherApi['name'];
                  this.windSpeed = weatherApi['wind']['speed'];
                  this.weatherTemp=weatherApi["main"]["temp"];

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

                 

                  this.db.getAlert(this.weatherMain.toLowerCase(),this.weatherDesc.toLowerCase()).then((result) => 
                  {
                    this.alert=result;
                  });
                });
            })
            .catch((error) => {
              this.db.sendMsg(JSON.stringify(error));
            });
          }
        })
        
       
      }
    },(err)=>{this.db.sendMsg("Please accept location permissions or you can entry by city name");});
    
  }

  doRefresh(event) {
    this.getLocation();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
  