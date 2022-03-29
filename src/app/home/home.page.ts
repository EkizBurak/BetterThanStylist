import { Component } from '@angular/core';
import { DatabaseService } from '../api/database.service';
import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { WeatherService } from '../api/weather.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';

@Component({
  selector: 'app-home',

  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
    Sunset: { Turkish: 'Gün Doğumu', English: 'Sunset' },
    WindSpeed: { Turkish: 'Rüzgar Hızı', English: 'Wind Speed' },
    Weather: { Turkish: 'Hava Durumu', English: 'Weather' },
    Reminder: {Turkish:"Hatırlatıcı", English: "Reminder"},
    ReminderName: {Turkish:"Hatırlatıcı İsmi", English: "Reminder Name"},
    City: { Turkish: 'Şehir', English: 'City' },
    thunderstormwithlightrain: { Turkish: 'Hafif Yağmurlu Fırtına', English: 'Thunderstorm With Light Rain' },
    thunderstormwithrain	: { Turkish: 'Yağmurlu Fırtına', English: 'Thunderstorm With Rain' },
    thunderstormwithheavyrain	: { Turkish: 'Şiddetli Yağmurlu Fırtına', English: 'Thunderstorm With Heavy Rain' },
    lightthunderstorm	: { Turkish: 'Hafif Fırtına', English: 'Light Thunderstorm' },
    thunderstorm	: { Turkish: 'Fırtına', English: 'Thunderstorm' },
    heavythunderstorm	: { Turkish: 'Şiddetli Fırtına', English: 'Heavy Thunderstorm' },
    raggedthunderstorm	: { Turkish: 'Düzensiz Fırtına', English: 'Ragged Thunderstorm' },
    thunderstormwithlightdrizzle	: { Turkish: 'Hafif Çiseleyen Fırtına', English: 'Thunderstorm With Light Drizzle' },
    thunderstormwithdrizzle	: { Turkish: 'Çiseleyen Fırtına', English: 'Thunderstorm With Drizzle' },
    thunderstormwithheavydrizzle	: { Turkish: 'Şiddetli Çiseleyen Fırtına', English: 'Thunderstorm With Heavy Drizzle' },
    lightintensitydrizzle	: { Turkish: 'Hafif Yoğunlukta Çiseleme', English: 'Light Intensity Drizzle' },
    drizzle	: { Turkish: 'Çiseleme', English: 'Drizzle' },
    heavyintensitydrizzle	: { Turkish: 'Şiddetli Çiseleme', English: 'Heavy Intensity Drizzle	' },
    lightintensitydrizzlerain	: { Turkish: 'Hafif Yoğunlukta Çiseleyen Yağmur', English: 'Light Intensity Drizzle Rain' },
    drizzlerain	: { Turkish: 'Çiseleyen Yağmur', English: 'Drizzle Rain' },
    heavyintensitydrizzlerain	: { Turkish: 'Şiddetli Çiseleyen Yağmur', English: 'Heavy Intensity Drizzle Rain' },
    showerrainanddrizzle	: { Turkish: 'Duş Yağmuru ve Çiseleme', English: 'Shower Rain and Drizzle' },
    heavyshowerrainanddrizzle	: { Turkish: 'Şiddetli Duş Yağmuru ve Çiseleme', English: 'Heavy Shower Rain and Drizzle' },
    showerdrizzle	: { Turkish: 'Duş Çiselemesi', English: 'Shower Drizzle' },
    lightrain	: { Turkish: 'Hafif Yağmur', English: 'Light Rain' },
    moderaterain	: { Turkish: 'Ilımlı Yağmur', English: 'Moderate Rain' },
    heavyintensityrain	: { Turkish: 'Şiddetli Yağmur', English: 'Heavy Intensity Rain' },
    veryheavyrain	: { Turkish: 'Çok şiddetli yağmur', English: 'Very Heavy Rain' },
    extremerain	: { Turkish: 'Aşırı şiddetli yağmur', English: 'Extreme Rain' },
    freezingrain	: { Turkish: 'Dondurucu Yağmur', English: 'Freezing Rain' },
    lightintensityshowerrain	: { Turkish: 'Hafif Yoğunlukta Duş Yağmuru', English: 'Light Intensity Shower Rain' },
    showerrain	: { Turkish: 'Duş Yağmuru', English: 'Shower Rain' },
    heavyintensityshowerrain	: { Turkish: 'Şiddetli Duş Yağmuru', English: 'Heavy Intensity Shower Rain' },
    raggedshowerrain	: { Turkish: 'Düzensiz Duş Yağmuru', English: 'Ragged Shower Rain' },
    lightsnow	: { Turkish: 'Hafif Kar', English: 'Light Snow' },
    snow	: { Turkish: 'Kar', English: 'Snow' },
    heavysnow	: { Turkish: 'Yoğun kar yağışı', English: 'Heavy Snow' },
    sleet: { Turkish: 'Sulu kar', English: 'Sleet' },
    lightshowersleet	: { Turkish: 'Karla Karışık Hafif Yağmur', English: 'Light Shower Sleet' },
    showersleet	: { Turkish: 'Karla Karışık Yağmur', English: 'Shower Sleet' },
    lightrainandsnow	: { Turkish: 'Karla Karışık Hafif Yağmur', English: 'Light Rain and Snow' },
    rainandsnow	: { Turkish: 'Karla Karışık Yağmur', English: 'Rain and Snow' },
    lightshowersnow	: { Turkish: 'Karla Karışık Hafif Yağmur', English: 'Light Shower Snow' },
    showersnow	: { Turkish: 'Sulu kar', English: 'Shower Snow' },
    heavyshowersnow	: { Turkish: 'Şiddetli Kar', English: 'Heavy Shower Snow' },
    ash: { Turkish: 'Kül', English: 'Ash' },
    clear: { Turkish: 'Açık Hava', English: 'Clear' },
    clouds: { Turkish: 'Bulutlu', English: 'Clouds' },
    rain: { Turkish: 'Yağmurlu', English: 'Rain' },
    squall: { Turkish: 'Fırtına', English: 'Squall' },
    mist: { Turkish: 'Sis', English: 'Mist' },
    smoke: { Turkish: 'Sis', English: 'Smoke' },
    haze: { Turkish: 'Pus', English: 'Haze' },
    fog: { Turkish: 'Sis', English: 'Fog' },
    sand: { Turkish: 'Kum', English: 'Sand' },
    dust	: { Turkish: 'Toz', English: 'Dust' },
    volcanicash	: { Turkish: 'Volkanik Kül', English: 'Volcanic ash' },
    squalls	: { Turkish: 'Fırtına', English: 'Squalls' },
    tornado	: { Turkish: 'Kasırga', English: 'Tornado' },
    clearsky	: { Turkish: 'Açık hava', English: 'Clear sky' },
    fewclouds	: { Turkish: 'Bulutlu', English: 'Few Clouds' },
    scatteredclouds: { Turkish: 'Dağınık Bulutlu', English: 'Scattered Clouds'},
    brokenclouds: { Turkish: 'Parçalı Bulutlu', English: 'Broken Clouds' },
    overcastclouds	: { Turkish: 'Parçalı Bulutlu', English: 'Overcast Clouds'},
    all:{Turkish:"Hepsi", English:"All"},
    description:{Turkish:"Açıklama", English:"Description"},
    create:{Turkish:"Oluştur",English:"Create"},
    weathertitle:{Turkish:"Hava Durumu Başlığır",English:"Weather Title"},
    weatherdesc:{Turkish:"Hava Durumu Açıklaması",English:"Weather Desc"},
    update:{Turkish:"Güncelle", English:"Update"}
    
  };
  modal="false";
  createModal="false";
  firstName: string;
  lastName: string;
  year: number;
  gender: string;
  musicPlatform: any;
  language: string;
  termsAndConditions: any;
  userCount:number;
  cityLocation="";

  reminderIsActive:string;
  reminderName:string;
  reminderWeatherTitle:any;
  reminderWeatherDesc:any;
  reminderWeatherTextArea:string;
  reminder:any;
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
  reminderUpdateName:string;
  alert:any;
  constructor(private db: DatabaseService,public platform: Platform,private menu: MenuController,
    private geoLocation: Geolocation,
    private weather: WeatherService,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic) 
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

       
      }).then(()=>{this.db.getReminder().then((result) => {
        this.reminder=result;});
      
      });
    }).catch((e)=>{this.db.sendMsg(e);});
  }
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  closeMenu() {
    this.menu.close();
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
      }
    }
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
  getLocation() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then((result)=>{
      if(result.hasPermission==false)
      {
        this.db.sendMsg("Please accept location permissions or you can entry by city name");
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION);    
        this.db.sendMsg("Please accept location permissions or you can entry by city name");
      }
      else{
        this.diagnostic.isLocationEnabled().then((result)=>
        {
          if(result==false)
          {
            this.db.sendMsg("Please enable your location");
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
                    this.db.sendMsg(JSON.stringify(this.alert));
                  });
                });
            })
            .catch((error) => {
              this.db.sendMsg(JSON.stringify(error));
            });
          }
        })
        
       
      }
    },(err)=>{this.db.sendMsg("Please accept location permissions or you can entry by city name");})
    
  }
  
  doRefresh(event) {
    this.getLocation();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  createReminder()
  {
    if(this.reminderName=="" || this.reminderName==undefined)
    {
      this.db.sendMsg("reminder name cannot be blank");
    }
    else if(this.reminderWeatherTitle=="" || this.reminderWeatherTitle==undefined)
    {
      this.db.sendMsg("Weather title cannot be blank");
    }
    else
    {
      this.db.createReminder(this.reminderName, this.reminderWeatherTitle, this.reminderWeatherDesc ,this.reminderWeatherTextArea);
      this.reminderWeatherTextArea="";
      this.closeModal();
    }
  }

  updateReminder()
  {
    if(this.reminderUpdateName=="" || this.reminderUpdateName==undefined)
    {
      this.db.sendMsg("reminder name cannot be blank");
    }
    else if(this.reminderWeatherTitle=="" || this.reminderWeatherTitle==undefined)
    {
      this.db.sendMsg("Weather title cannot be blank");
    }
    else
    {
      this.db.updateReminder(this.reminderUpdateName,this.reminderName, this.reminderWeatherTitle, this.reminderWeatherDesc ,this.reminderWeatherTextArea);
    }
    this.closeModal();
  }
  openCreateReminder()
  {
    this.createModal="True";
  }
  openModal(isActive:string, reminderName:string, weatherTitle:string, weatherDesc:string, weatherTextArea:string)
  {
    
    this.reminderIsActive=isActive;
    this.reminderName=reminderName;

    this.reminderWeatherTitle=weatherTitle.split(",");
    this.reminderWeatherDesc=weatherDesc.split(",");
    this.reminderWeatherTextArea=weatherTextArea; 
    this.modal="true";
  }
  closeModal()
  {
    this.modal="false";
    this.createModal="false";
    this.db.getReminder().then((result) => 
    {
      this.reminder=result;
    });
    this.reminderIsActive=undefined;
    this.reminderName=undefined;
    this.reminderWeatherTitle=undefined;
    this.reminderWeatherDesc=undefined;
    this.reminderWeatherTextArea=""; 
  }
  deactiveReminder(reminderName:string,reminderIsActive:any)
  {
    if(reminderIsActive=="true")
    {
      reminderIsActive="false";
    }
    else
    {
      reminderIsActive="true";
    }
    this.db.deactiveReminder(reminderName,reminderIsActive);
    this.closeModal();
  }
  deleteReminder(reminderName:string)
  {
    this.db.deleteReminder(reminderName);
    this.closeModal();

  }
  reminderEdit(updateName:string)
  {
    this.reminderUpdateName=updateName;
  }
  reminderCreateDismiss()
  {
    this.reminderWeatherTitle="";
  }
  reminderWeatherTitleChange()
  {
    if (this.reminderWeatherTitle.includes("all"))
    {
      this.reminderWeatherTitle="ash,clear,clouds,drizzle,dust,fog,haze,mist,rain,sand,smoke,snow,squall,thunderstorm,tornado".split(",");
    }
    if(!this.reminderWeatherTitle.includes("ash") && this.reminderWeatherDesc.includes("volcanic ash"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("volcanic ash"),1);
    }
    if(!this.reminderWeatherTitle.includes("clear") && this.reminderWeatherDesc.includes("clear sky"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("clear sky"),1);
    }
    if(!this.reminderWeatherTitle.includes("clouds") && (this.reminderWeatherDesc.includes("few clouds") || this.reminderWeatherDesc.includes("scattered clouds") || this.reminderWeatherDesc.includes("broken clouds") || this.reminderWeatherDesc.includes("overcast clouds")))
    {
      if (this.reminderWeatherDesc.indexOf("few clouds") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("few clouds"),1);
      }
      if (this.reminderWeatherDesc.indexOf("scattered clouds") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("scattered clouds"),1);
      }
      if (this.reminderWeatherDesc.indexOf("broken clouds") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("broken clouds"),1);
      }
      if (this.reminderWeatherDesc.indexOf("overcast clouds") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("overcast clouds"),1);
      }
    }
    if(!this.reminderWeatherTitle.includes("drizzle") && (this.reminderWeatherDesc.includes("light intensity drizzle") || this.reminderWeatherDesc.includes("heavy intensity drizzle") || this.reminderWeatherDesc.includes("light intensity drizzle rain") || this.reminderWeatherDesc.includes("drizzle rain") || this.reminderWeatherDesc.includes("heavy intensity drizzle rain") || this.reminderWeatherDesc.includes("shower rain and drizzle") || this.reminderWeatherDesc.includes("heavy shower rain and drizzle") || this.reminderWeatherDesc.includes("shower drizzle")))
    {
      if (this.reminderWeatherDesc.indexOf("drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("drizzle"),1);
      }
      if (this.reminderWeatherDesc.indexOf("light intensity drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light intensity drizzle"),1);
      }
      if (this.reminderWeatherDesc.indexOf("light intensity drizzle rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light intensity drizzle rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("heavy intensity drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("heavy intensity drizzle"),1);
      }
      if (this.reminderWeatherDesc.indexOf("drizzle rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("drizzle rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("heavy intensity drizzle rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("heavy intensity drizzle rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("shower rain and drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("shower rain and drizzle"),1);
      }
      if (this.reminderWeatherDesc.indexOf("heavy shower rain and drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("heavy shower rain and drizzle"),1);
      }
      if (this.reminderWeatherDesc.indexOf("shower drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("shower drizzle"),1);
      }
    }
    if(!this.reminderWeatherTitle.includes("dust") && this.reminderWeatherDesc.includes("dust"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("dust"),1);
    }
    if(!this.reminderWeatherTitle.includes("fog") && this.reminderWeatherDesc.includes("fog"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("fog"),1);
    }
    if(!this.reminderWeatherTitle.includes("haze") && this.reminderWeatherDesc.includes("haze"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("haze"),1);
    }
    if(!this.reminderWeatherTitle.includes("mist") && this.reminderWeatherDesc.includes("mist"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("mist"),1);
    }
    if(!this.reminderWeatherTitle.includes("rain") && (this.reminderWeatherDesc.includes("light rain") || this.reminderWeatherDesc.includes("moderate rain") || this.reminderWeatherDesc.includes("heavy intensity rain") || this.reminderWeatherDesc.includes("very heavy rain") || this.reminderWeatherDesc.includes("extreme rain") || this.reminderWeatherDesc.includes("freezing rain") || this.reminderWeatherDesc.includes("light intensity shower rain") || this.reminderWeatherDesc.includes("shower rain") || this.reminderWeatherDesc.includes("heavy intensity shower rain") || this.reminderWeatherDesc.includes("ragged shower rain")))
    {
      if (this.reminderWeatherDesc.indexOf("light rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("moderate rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("moderate rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("heavy intensity rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("heavy intensity rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("very heavy rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("very heavy rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("extreme rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("extreme rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("freezing rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("freezing rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("light intensity shower rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light intensity shower rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("shower rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("shower rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("heavy intensity shower rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("heavy intensity shower rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("ragged shower rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("ragged shower rain"),1);
      }
    }
    if(!this.reminderWeatherTitle.includes("sand") && this.reminderWeatherDesc.includes("sand"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("sand"),1);
    }
    if(!this.reminderWeatherTitle.includes("smoke") && this.reminderWeatherDesc.includes("smoke"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("smoke"),1);
    }
    if(!this.reminderWeatherTitle.includes("snow") && (this.reminderWeatherDesc.includes("light snow") || this.reminderWeatherDesc.includes("snow") || this.reminderWeatherDesc.includes("heavy snow") || this.reminderWeatherDesc.includes("sleet") || this.reminderWeatherDesc.includes("light shower sleet") || this.reminderWeatherDesc.includes("shower sleet") || this.reminderWeatherDesc.includes("light rain and snow") || this.reminderWeatherDesc.includes("rain and snow") || this.reminderWeatherDesc.includes("light shower snow") || this.reminderWeatherDesc.includes("shower snow") || this.reminderWeatherDesc.includes("heavy shower snow")))
    {
      if (this.reminderWeatherDesc.indexOf("light snow") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light snow"),1);
      }
      if (this.reminderWeatherDesc.indexOf("snow") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("snow"),1);
      }
      if (this.reminderWeatherDesc.indexOf("heavy snow") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("heavy snow"),1);
      }
      if (this.reminderWeatherDesc.indexOf("sleet") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("sleet"),1);
      }
      if (this.reminderWeatherDesc.indexOf("light shower sleet") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light shower sleet"),1);
      }
      if (this.reminderWeatherDesc.indexOf("shower sleet") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("shower sleet"),1);
      }
      if (this.reminderWeatherDesc.indexOf("light rain and snow") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light rain and snow"),1);
      }
      if (this.reminderWeatherDesc.indexOf("rain and snow") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("rain and snow"),1);
      }
      if (this.reminderWeatherDesc.indexOf("light shower snow") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light shower snow"),1);
      }
      if (this.reminderWeatherDesc.indexOf("shower snow") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("shower snow"),1);
      }
      if (this.reminderWeatherDesc.indexOf("heavy shower snow") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("heavy shower snow"),1);
      }
    }
    if(!this.reminderWeatherTitle.includes("squall") && this.reminderWeatherDesc.includes("squall"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("squall"),1);
    }
    if(!this.reminderWeatherTitle.includes("thunderstorm") && (this.reminderWeatherDesc.includes("thunderstorm") || this.reminderWeatherDesc.includes("thunderstorm with light rain") || this.reminderWeatherDesc.includes("thunderstorm with rain") || this.reminderWeatherDesc.includes("thunderstorm with heavy rain") || this.reminderWeatherDesc.includes("llight thunderstorm") || this.reminderWeatherDesc.includes("heavy thunderstorm") || this.reminderWeatherDesc.includes("ragged thunderstorm") || this.reminderWeatherDesc.includes("thunderstorm with light drizzle") || this.reminderWeatherDesc.includes("thunderstorm with drizzle") || this.reminderWeatherDesc.includes("thunderstorm with heavy drizzle")))
    {
      if (this.reminderWeatherDesc.indexOf("thunderstorm") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("thunderstorm"),1);
      }
      if (this.reminderWeatherDesc.indexOf("thunderstorm with light rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("thunderstorm with light rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("thunderstorm with rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("thunderstorm with rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("thunderstorm with heavy rain") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("thunderstorm with heavy rain"),1);
      }
      if (this.reminderWeatherDesc.indexOf("light thunderstorm") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("light thunderstorm"),1);
      }
      if (this.reminderWeatherDesc.indexOf("heavy thunderstorm") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("heavy thunderstorm"),1);
      }
      if (this.reminderWeatherDesc.indexOf("ragged thunderstorm") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("ragged thunderstorm"),1);
      }
      if (this.reminderWeatherDesc.indexOf("thunderstorm with light drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("thunderstorm with light drizzle"),1);
      }
      if (this.reminderWeatherDesc.indexOf("thunderstorm with drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("thunderstorm with drizzle"),1);
      }
      if (this.reminderWeatherDesc.indexOf("thunderstorm with heavy drizzle") > -1)
      {
        this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("thunderstorm with heavy drizzle"),1);
      }
    }
    if(!this.reminderWeatherTitle.includes("tornado") && this.reminderWeatherDesc.includes("tornado"))
    {
      this.reminderWeatherDesc.splice(this.reminderWeatherDesc.indexOf("tornado"),1);
    }
  }
  reminderWeatherDescChange()
  {
    let reminderWeatherDesc=[];

    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('ash'))
    {
      reminderWeatherDesc.push("volcanic ash");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('clear'))
    {
      reminderWeatherDesc.push("clear sky");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('clouds'))
    {
      reminderWeatherDesc.push("few clouds","scattered clouds","broken clouds","overcast clouds");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('drizzle'))
    {
      reminderWeatherDesc.push("light intensity drizzle","drizzle","heavy intensity drizzle","light intensity drizzle rain","drizzle rain","heavy intensity drizzle rain","shower rain and drizzle","heavy shower rain and drizzle","shower drizzle");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('dust'))
    {
      reminderWeatherDesc.push("dust");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('fog'))
    {
      reminderWeatherDesc.push("fog");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('haze'))
    {
      reminderWeatherDesc.push("haze");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('mist'))
    {
      reminderWeatherDesc.push("mist");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('rain'))
    {
      reminderWeatherDesc.push("light rain","moderate rain","heavy intensity rain","very heavy rain","extreme rain","freezing rain","light intensity shower rain","shower rain","heavy intensity shower rain","ragged shower rain");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('sand'))
    {
      reminderWeatherDesc.push("sand");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('smoke'))
    {
      reminderWeatherDesc.push("smoke");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('snow'))
    {
      reminderWeatherDesc.push("light snow","snow","heavy snow","sleet","light shower sleet","shower sleet","light rain and snow","rain and snow","light shower snow","shower snow","heavy shower snow");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('squall'))
    {
      reminderWeatherDesc.push("squalls");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('thunderstorm'))
    {
      reminderWeatherDesc.push("thunderstorm","thunderstorm with light rain","thunderstorm with rain","thunderstorm with heavy rain","light thunderstorm","heavy thunderstorm","ragged thunderstorm","thunderstorm with light drizzle","thunderstorm with drizzle","thunderstorm with heavy drizzle");
    }
    if (this.reminderWeatherDesc.includes("all") && this.reminderWeatherTitle.includes('tornado'))
    {
      reminderWeatherDesc.push("tornado");
    }
    if(reminderWeatherDesc.length>0)
    {
      this.reminderWeatherDesc=reminderWeatherDesc;
    }
    this.db.sendMsg(reminderWeatherDesc);
  }
}
  