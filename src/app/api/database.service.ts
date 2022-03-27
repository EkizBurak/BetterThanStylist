import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  databaseNesnesi: SQLiteObject;
  userCount: number;
  constructor(
    private sqlite: SQLite,
    private toast: Toast,
  ) {
    
  }
  sendMsg(msg) {
    this.toast.show(msg, '5000', 'bottom').subscribe((toast) => {
      console.log(toast);
    });
  }
  getUser() {
    return this.sqlite
    .create({
      name: 'users.db',
      location: 'default',
    })
    .then((db: SQLiteObject) => {
      db.executeSql(
        'create table IF NOT EXISTS usersdata(firstName TEXT, lastName TEXT, age INTEGER, gender TEXT, musicPlatform TEXT, language TEXT)',
        []
      ).then(()=>
      {
        db.executeSql(
        'create table IF NOT EXISTS reminder(isActive TEXT,reminderName TEXT, weatherTitle TEXT, weatherDesc TEXT, weatherTextArea TEXT)',
        []
      );
    });
      
      this.databaseNesnesi = db;
    })
    .then(() => {
      return this.databaseNesnesi
      .executeSql('select * from usersdata', [])
      .then((data) => {
        this.userCount=data.rows.length;
        return data;
      });
    })
    .catch((e) => this.sendMsg(JSON.stringify(e)));
   /*
    return this.databaseNesnesi
      .executeSql('select * from usersdata', [])
      .then((data) => {
        return data;
      });
      */
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
      return this.userCount;
    }
  }
  updateUsers(firstName, lastName, age, gender, musicPlatform, language) {
    this.databaseNesnesi.executeSql(
      `update usersdata set firstName = '${firstName}', lastName= '${lastName}', age= '${age}', gender= '${gender}', musicPlatform= '${musicPlatform}', language= '${language}'`
    );
    this.sendMsg('User update successfully');
  }
  createReminder(reminderName,weatherTitle,weatherDesc,weatherTextArea)
  {
    this.databaseNesnesi.executeSql(`select * from reminder where reminderName='${reminderName}'`,[]).then((result)=>
    {
      if(result.rows.length==0)
      {
        this.databaseNesnesi.executeSql(
          `insert into reminder (isActive, reminderName, weatherTitle, weatherDesc, weatherTextArea) values ('true','${reminderName}','${weatherTitle}','${weatherDesc}','${weatherTextArea}')`
        );
        this.sendMsg("Reminder Create Succesfully")
      }
      else
      {
        this.sendMsg("Reminder already exit please change reminde name");
      }
    }).catch((e)=>{this.sendMsg("Error" + JSON.stringify(e));});
  }
  
  getReminder() 
  {   
      
      return this.databaseNesnesi.executeSql('select * from reminder',[]).then((data)=>{
        let reminder = [];
        if(data.rows.length>0){ 
          for(let k=0;k<data.rows.length;k++){
            reminder.push({isActive:data.rows.item(k).isActive, reminderName:data.rows.item(k).reminderName, weatherTitle:data.rows.item(k).weatherTitle, weatherDesc:data.rows.item(k).weatherDesc, weatherTextArea:data.rows.item(k).weatherTextArea});    
          }
        }
        return reminder;
      });
  }
  deleteReminder(reminderName)
  {
    this.databaseNesnesi.executeSql(`delete from reminder where reminderName='${reminderName}'`,[]);
    this.sendMsg("Delete Succesfully");
  }
  deactiveReminder(reminderName,status)
  {
    this.databaseNesnesi.executeSql(
      `update reminder set isActive = '${status}' where reminderName='${reminderName}'`
    );
    this.sendMsg('User update successfully');
  }
  updateReminder(reminderUpdateName,reminderName,weatherTitle,weatherDesc,weatherTextArea)
  {
    this.databaseNesnesi.executeSql(
      `update reminder set reminderName = '${reminderUpdateName}', weatherTitle= '${weatherTitle}', weatherDesc= '${weatherDesc}', weatherTextArea= '${weatherTextArea}' where reminderName='${reminderName}'`
    );

    this.sendMsg('User update successfully');
  }
}
