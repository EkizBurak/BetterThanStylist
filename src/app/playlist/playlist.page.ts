import { Component } from '@angular/core';
import { DatabaseService } from '../api/database.service';
import { WeatherService } from '../api/weather.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage {
  languages = {
    playlistName:{Turkish:"Oynatma Listesi Adı",English:"Playlist Name",German:"Playlist-Name", French:"Nom de la liste de lecture", Spanish:"Nom de la liste de lecture",Chinese:"播放列表名称"},
    categories:{Turkish:"Kategoriler",English:"Categories",German:"Kategorien", French:"Catégories", Spanish:"Catégories",Chinese:"类别"},
    songCount:{Turkish:"Şarkı Sayısı",English:"Number of Songs",German:"Anzahl der Lieder", French:"Nombre de chansons", Spanish:"Nombre de chansons",Chinese:"歌曲数"},
    likes:{Turkish:"Beğenme Sayısı",English:"likes",German:"likes", French:"aime", Spanish:"aime",Chinese:"喜欢"},
  };
  
  musicPlatform: any;
  language: string;
  weatherMain:string;
  weatherDesc: string;
  lat: number;
  long: number;
  spotifyPlaylists=[];
  youtubeMusicPlaylists=[];
  appleMusicPlaylists=[];
  playlistsLength:any;
  playlistsImage=[];

  constructor(
    private db: DatabaseService,
    private geoLocation: Geolocation,
    private weather: WeatherService,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    private file: File) 
    {
      this.db.getUser().then((result) => {
          this.musicPlatform = result.rows.item(0).musicPlatform.split(",");
          this.language = result.rows.item(0).language;
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
    
                  this.weatherMain = weatherApi['weather'][0]['main'];
                  this.weatherDesc = weatherApi['weather'][0]['description'];
                  this.weather.getPlaylist(this.weatherMain).then((result)=>
                  {
                    this.spotifyPlaylists=result["spotifyPlaylist"];
                    this.youtubeMusicPlaylists=result["youtubeMusicPlaylist"];
                    this.appleMusicPlaylists=result["appleMusicPlaylist"];
                    this.playlistsLength=this.spotifyPlaylists.length;
                    
                    if (this.youtubeMusicPlaylists.length>this.playlistsLength)
                    {
                      this.playlistsLength=this.youtubeMusicPlaylists.length;
                    }
                    if (this.appleMusicPlaylists.length>this.playlistsLength)
                    {
                      this.playlistsLength=this.appleMusicPlaylists.length;
                    }
                    if(this.playlistsImage.length>1)
                    {
                      this.playlistsImage=[];
                    }
                    for(let i=0;i<=this.playlistsLength;i++)
                      {
                        this.file.listDir(this.file.applicationDirectory, 'www/assets/images/playlistsBackGround/')
                        .then(items =>{
                        this.playlistsImage.push(Math.floor(Math.random() * items.length)+1);
                        });
                      }
                   
                    this.playlistsLength = Array(this.spotifyPlaylists.length).fill(this.spotifyPlaylists.length).map((x,i)=>i);
                  });
                });
            });
            
          }
        })
      }
    },(err)=>{this.db.sendMsg("Please accept location permissions");});
  }

  refreshGetPlaylist(event)
  {
    this.getLocation();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  ionViewWillEnter()
  {
    this.db.getUser().then((result) => {
      this.musicPlatform = result.rows.item(0).musicPlatform.split(",");
      this.language = result.rows.item(0).language;
      this.getLocation();
  });
  }
}
