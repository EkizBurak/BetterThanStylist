import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  databaseNesnesi: SQLiteObject;
  constructor(private sqlite: SQLite, private toast: Toast) {}
  /*
  getUserCount() {
    this.databaseNesnesi
      .executeSql('select count(*) from usersdata', [])
      .then((data) => {
        this.sendMsg(JSON.stringify(data));
        return data;
      })
      .catch(() => {
        return 0;
      });
  }
  */
  createUser(firstName, lastName, age, gender, musicPlatform, language) {
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
      .catch((e) => this.sendMsg(JSON.stringify(e)));

    this.databaseNesnesi
      .executeSql(
        `insert into usersdata (title,desc) values ('${firstName}','${lastName}','${age}','${gender}','${firstName}','${musicPlatform}','${language}')`
      )
      .then((data) => {
        this.sendMsg('Veri Eklendi');
      });
  }
  sendMsg(msg) {
    this.toast.show(msg, '5000', 'bottom').subscribe((toast) => {
      console.log(toast);
    });
  }
  /* 
  async createDataBase() {
    this.sendMsg('sad');
    await this.sqlite
      .create({ name: 'todo', location: 'default' })
      .then((db: SQLiteObject) => {
        this.databaseNesnesi = db;
      })
      .catch((e) => {
        alert('error on creating database' + JSON.stringify(e));
      });
    await this.createDataBase();
  }
  
  async createTables() {
    await this.databaseNesnesi.executeSql(
      'CREATE TABLE IF NOT EXITS todo(ID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT)',
      []
    );
  }
  async addCategory(as3: string, as2: string) {
    return this.databaseNesnesi
      .executeSql(
        `insert into todo (title,desc) values ('${as3}','${as2}')`,
        []
      )
      .then(() => {
        this.sendMsg('category created');
        return 'category created';
      })
      .catch((e) => {
        if (e.code === 6) {
          this.sendMsg('category already exists');
          return 'category already exists';
        }
        this.sendMsg('error on creating category ');
        return 'error on creating category ' + JSON.stringify(e);
      });
  }
  */
}
