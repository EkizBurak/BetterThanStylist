import { LowerCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import {DatabaseService} from '../api/database.service'
@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  apiKey: string = '47fa5287540ef7106c22c923aee59c6e';

  constructor(private http: HTTP, private db:DatabaseService) {
  }

  getWeatherByCoord(lat: number, lon: number) {

    return this.http.get("https://api.openweathermap.org/data/2.5/weather?units=metric&lat="+lat +"&lon="+lon+"&lang=en&appid="+this.apiKey, {}, {})
    .then((data) => 
    {
      let x = data.data;
      x=JSON.stringify(x).replace(/\\/g, "").replace('"',"'").replace(/.$/,"'");
      return JSON.parse(eval(x));     
    })
    .catch((e)=>this.db.sendMsg(JSON.stringify(e)))
  }

  getPlaylist(weatherMain)
  {
    /*
    return this.http.get("https://burakekiz.xyz/BetterThanStylist.php",{},{}).then((data)=>
    {
      let x = data.data;
      x=JSON.stringify(x).replace(/\\/g, "").replace('"',"'").replace(/.$/,"'");
      return JSON.parse(eval(x));
    }).catch((e)=>{this.db.sendMsg(JSON.stringify(e));})
    */

    return this.http.post("https://burakekiz.xyz/BetterThanStylist.php",{weather:weatherMain.toLowerCase()},{}).then((data)=>
    {
      let x = data.data;
      x=JSON.stringify(x).replace(/\\/g, "").replace('"',"'").replace(/.$/,"'");
      return JSON.parse(eval(x));
    }).catch((e)=>{this.db.sendMsg(JSON.stringify(e));})
  }
  getClothes(weatherMain,weatherTemperature)
  {
    return this.http.post("https://burakekiz.xyz/clothes.php",{weather:weatherMain.toLowerCase(),temperature:weatherTemperature},{}).then((data)=>
    {
      let x = data.data;
      x=JSON.stringify(x).replace(/\\/g, "").replace('"',"'").replace(/.$/,"'");
      return JSON.parse(eval(x));
    }).catch((e)=>{this.db.sendMsg(JSON.stringify(e));})
  }
}
