import { Component } from '@angular/core';
import { DatabaseService } from '../api/database.service';
import { Platform } from '@ionic/angular';
import { WeatherService } from '../api/weather.service';
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage {

   languages = {
   
ReminderName: {Turkish:"Hatırlatıcı İsmi", English: "Reminder Name",German:"Erinnerungsname", French:"Nom du rappel", Spanish:"Nom du rappel",Chinese:"提醒名称"},
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
all:{Turkish:"Hepsi", English:"All",German:"Alle", French:"Tous", Spanish:"Tous",Chinese:"全部"},
description:{Turkish:"Açıklama", English:"Description",German:"Beschreibung", French:"La description", Spanish:"La description",Chinese:"描述"},
create:{Turkish:"Oluştur",English:"Create",German:"Schaffen", French:"Créer", Spanish:"Créer",Chinese:"创建"},
weathertitle:{Turkish:"Hava Durumu Başlığı",English:"Weather Title",German:"Titel Wetter", French:"Titre météo", Spanish:"Titre météo",Chinese:"天气标题"},
weatherdesc:{Turkish:"Hava Durumu Açıklaması",English:"Weather Desc",German:"Wetterbesch", French:"Description météo", Spanish:"Description météo",Chinese:"天气描述"},
update:{Turkish:"Güncelle", English:"Update",German:"Aktualisieren", French:"Mettre à jour", Spanish:"Mettre à jour",Chinese:"更新"},
reminderAlertLevel:{Turkish:"Hatırlatıcı Uyarı Seviyesi",English:"Reminder Alert Level",German:"Erinnerungsalarmstufe", French:"Niveau d'alerte de rappel", Spanish:"Niveau d'alerte de rappel",Chinese:"提醒警报级别"},
  };
  modal="false";
  createModal="false";
  language: string;

  reminderAlertLevel:string;
  reminderIsActive:string;
  reminderName:string;
  reminderWeatherTitle:any;
  reminderWeatherDesc:any;
  reminderWeatherTextArea:string;
  reminder:any;
  reminderUpdateName:string;
  weatherMain:string;
  weatherDesc: string;
  alert=[];
  constructor(
    private db: DatabaseService,
    public platform: Platform,
    private weather: WeatherService,) 
  {
    this.db.getUser().then((result) => {
      this.language = result.rows.item(0).language;
      this.db.getReminder().then((result) => 
      {
        this.reminder=result;
      });
    });
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
      this.db.createReminder(this.reminderName,this.reminderAlertLevel, this.reminderWeatherTitle, this.reminderWeatherDesc ,this.reminderWeatherTextArea);
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
      this.db.updateReminder(this.reminderUpdateName,this.reminderName,this.reminderAlertLevel, this.reminderWeatherTitle, this.reminderWeatherDesc ,this.reminderWeatherTextArea);
    }
    this.closeModal();
  }
  openCreateReminder()
  {
    this.createModal="True";
  }
  openModal(isActive:string, reminderName:string, reminderAlertLevel:string,weatherTitle:string, weatherDesc:string, weatherTextArea:string)
  {
    
    this.reminderIsActive=isActive;
    this.reminderName=reminderName;
    this.reminderAlertLevel=reminderAlertLevel;
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
    this.db.getAlert(this.weatherMain.toLowerCase(),this.weatherDesc.toLowerCase()).then((result) => 
    {
      this.alert=result;
    });
    this.reminderIsActive=undefined;
    this.reminderName=undefined;
    this.reminderAlertLevel=undefined;
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
