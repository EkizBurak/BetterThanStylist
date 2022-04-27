import { Component } from '@angular/core';
import { DatabaseService } from '../api/database.service';
import { WeatherService } from '../api/weather.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AnimationController } from '@ionic/angular';
 
@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.page.html',
  styleUrls: ['./clothes.page.scss'],
})
export class ClothesPage{

  gender: string;
  weatherMain:string;
  lat: number;
  long: number;
  weatherTemp:number;
  clothesTopPath:any;
  clothesTopNumber:any;
  clothesBottomPath:any;
  clothesBottomNumber:any;
  clothesTopHeight:any;
  clothesBottomHeight:any;
  clothesTopColor:any;
  clothesBottomColor:any;
  clothesBackGround:number;
  constructor(
    private db: DatabaseService,
    private geoLocation: Geolocation,
    private weather: WeatherService,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    private file: File,
    private animationCtrl: AnimationController) 
  {
      this.db.getUser().then((result) => 
      {
          this.gender = result.rows.item(0).gender;
          this.getLocation();
      });
  }

  getLocation() {
    
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then((result)=>{
      if(result.hasPermission==false)
      {
        this.db.sendMsg("Please accept location permissions");
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(()=>
        {
          this.getLocation();
        });    
        
        this.db.sendMsg("Please accept location permissions");
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
                  this.weatherMain= weatherApi['weather'][0]['main'];
                  this.weatherTemp=weatherApi["main"]["temp"];
                  
                  
                  const squareA = this.animationCtrl.create()
                    .addElement(document.querySelector('.square-a'))
                    .keyframes([
                      { offset: 0, transform: 'scale(1)', opacity: '1' },
                      { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
                      { offset: 1, transform: 'scale(1)', opacity: '1' }
                    ]);

                    const squareB = this.animationCtrl.create()
                    .addElement(document.querySelector('.square-b'))
                    .fromTo('transform', 'translateX(-100%)', 'translateX(0%)')
                    .fromTo('opacity', '0.2', '1');

                    const squareC = this.animationCtrl.create()
                    .addElement(document.querySelector('.square-c'))
                    .keyframes([
                      { offset: 0, transform: 'scale(1)', opacity: '1' },
                      { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
                      { offset: 1, transform: 'scale(1)', opacity: '1' }
                    ]);

                    const squareD = this.animationCtrl.create()
                    .addElement(document.querySelector('.square-d'))
                    .fromTo('transform', 'translateX(-100%)', 'translateX(0%)')
                    .fromTo('opacity', '0.2', '1');
                  const animation = this.animationCtrl.create()
                    .duration(2000)
                    .addAnimation([squareA,squareB,squareC, squareD])

                  animation.play();
                  this.file.listDir(this.file.applicationDirectory, 'www/assets/images/clothesBackGround/')
                  .then(items =>{
                    this.clothesBackGround =Math.floor(Math.random() * items.length)+1;
                  });
                  this.weather.getClothes(this.weatherMain,this.weatherTemp).then((result)=>
                  {

                  this.clothesTopColor=result["colorCode"][Math.floor(Math.random() * result["colorCode"].length)];
                  this.clothesBottomColor=result["colorCode"][Math.floor(Math.random() * result["colorCode"].length)];
                  
                  //this.db.sendMsg(result['clothes'][this.gender+"top"][Math.floor(Math.random() * result['clothes'][this.gender+"top"].length)]);
                  this.clothesTopPath='assets/clothes/'+this.gender+'/'+result['clothes'][this.gender+"top"][Math.floor(Math.random() * result['clothes'][this.gender+"top"].length)] +'/';
                  this.clothesBottomPath='assets/clothes/'+this.gender+'/'+result['clothes'][this.gender+"bottom"][Math.floor(Math.random() * result['clothes'][this.gender+"bottom"].length)] +'/';
                  this.clothesTopHeight=45;
                  this.clothesBottomHeight=45;
                  if(this.clothesTopPath.includes("dress")==true)
                    {
                      this.clothesTopHeight=90;
                      this.clothesBottomHeight=0;
                      this.clothesBottomPath="";
                    }
                  this.file.listDir(this.file.applicationDirectory, 'www/'+this.clothesTopPath)
                  .then(items =>{
                    this.clothesTopNumber =Math.floor(Math.random() * items.length)+1;
                      
                    //this.clothescount = Array(items.length).fill(items.length).map((x,i)=>i+1);
                    this.clothesTopPath=this.clothesTopPath.replaceAll("/","\\");
                  });
                  this.file.listDir(this.file.applicationDirectory, 'www/'+this.clothesBottomPath)
                  .then(items =>{
                    this.clothesBottomNumber =Math.floor(Math.random() * items.length)+1;
                    //this.clothescount = Array(items.length).fill(items.length).map((x,i)=>i+1);
                    this.clothesBottomPath=this.clothesBottomPath.replaceAll("/","\\");
                  });
                  });
                  /*
                  this.clothespath='assets/clothes/'+this.gender+'/pantalon/';
                  this.file.listDir(this.file.applicationDirectory, 'www/'+this.clothespath)
                  .then(items =>{
                    this.db.sendMsg(Math.floor(Math.random() * items.length)+1);
                    this.clothescount = Array(items.length).fill(items.length).map((x,i)=>i+1);
                    this.clothespath=this.clothespath.replaceAll("/","\\");
                  })
                  .catch(err => {
                  this.db.sendMsg(JSON.stringify(err));
                  });
                */
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
  refreshGetClothes(event)
  {
    this.getLocation();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}