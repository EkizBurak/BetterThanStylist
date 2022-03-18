import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import {DatabaseService} from '../api/database.service'
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
  url =
    'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&appid=';
  apiKey: string = '47fa5287540ef7106c22c923aee59c6e';

  constructor(private http: HTTP, private db:DatabaseService) {
    this.url += this.apiKey;
  }

  getWeatherByCoord(lat: number, lon: number) {

    //"https://jsonplaceholder.typicode.com/todos/1"
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat +"&lon="+lon+"&lang=en&appid="+this.apiKey, {}, {})
    .then((data) => 
    {
      let x = data.data;
      x=JSON.stringify(x).replace(/\\/g, "").replace('"',"'").replace(/.$/,"'");
      return JSON.parse(eval(x));
      
     
    })
    .catch((e)=>this.db.sendMsg(JSON.stringify(e)))
  }
}
