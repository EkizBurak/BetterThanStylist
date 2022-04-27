import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../api/database.service';
import { Platform } from '@ionic/angular';
import { WeatherService } from '../api/weather.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage {

  userCount:any;
  alert=[];
  weatherMain:string;
  weatherDesc: string;
  lat: number;
  long: number;
  constructor(private menu: MenuController,
    public platform: Platform,
    private db: DatabaseService,    
    private geoLocation: Geolocation,
    private weather: WeatherService,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,) { 
    platform.ready().then(() => 
    {
      this.db.getUser().then((result) => {
        
        this.userCount = result.rows.length;
        this.getLocation();
      });
    }).catch((e)=>{this.db.sendMsg(e);});}
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
}
