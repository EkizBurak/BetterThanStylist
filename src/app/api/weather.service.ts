import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url =
    'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&appid=';
  apiKey: string = '47fa5287540ef7106c22c923aee59c6e';

  constructor(private http: HttpClient) {
    this.url += this.apiKey;
  }

  getWeatherByCoord(lat: number, lon: number) {
    return this.http.get(this.url + '&lat=' + lat + '&lon=' + lon);
  }
}
