import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  databaseNesnesi: SQLiteObject;
  userCount: number;
  constructor(
    private sqlite: SQLite,
    private toast: Toast,
    public platform: Platform,
    private router: Router
  ) {
    platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'users.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          db.executeSql(
            'create table IF NOT EXISTS usersdata(firstName TEXT, lastName TEXT, age INTEGER, gender TEXT, musicPlatform TEXT, language TEXT)',
            []
          );

          this.databaseNesnesi = db;
        })
        .then(() => {
          this.getUserCount().then((result) => {
            this.userCount = result.rows.length;

            if (this.userCount >= 1) {
              this.router.navigateByUrl('/better-than-stylist');
            }
          });
        })
        .catch((e) => this.sendMsg(JSON.stringify(e)));
    });
  }
  sendMsg(msg) {
    this.toast.show(msg, '5000', 'bottom').subscribe((toast) => {
      console.log(toast);
    });
  }
  getUserCount() {
    return this.databaseNesnesi
      .executeSql('select * from usersdata', [])
      .then((data) => {
        return data;
      });
  }

  createUser(firstName, lastName, age, gender, musicPlatform, language) {
    if (this.userCount >= 1) {
      this.sendMsg('User already exit');
    } else {
      this.databaseNesnesi.executeSql(
        `insert into usersdata (firstName, lastName, age, gender, musicPlatform, language) values ('${firstName}','${lastName}','${age}','${gender}','${musicPlatform}','${language}')`
      );

      this.sendMsg('User Create Successfully');

      this.userCount += 1;
    }
    this.router.navigateByUrl('/better-than-stylist');
  }
  updateUsers(firstName, lastName, age, gender, musicPlatform, language) {
    // Update İşlemi
    this.databaseNesnesi.executeSql(
      `update usersdata set firstName = '${firstName}', lastName= '${lastName}', age= '${age}', gender= '${gender}', musicPlatform= '${musicPlatform}', language= '${language}'`
    );

    this.sendMsg('User update successfully');
  }
}
