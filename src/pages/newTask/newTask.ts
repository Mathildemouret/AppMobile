import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-about',
  templateUrl: 'newTask.html'
})

export class newTaskPage {

  title : String;
  task : String;
  

  constructor( public navCtrl: NavController, private http: Http ) {
  
  }

  addTask() {
 
    return new Promise(resolve => {
 
      var requete = {
        author : sessionStorage.getItem("loggedUser"),
        title : this.title,
        task : this.task
      };

      this.http.post('http://appwebpolytechpartie1.herokuapp.com/addTask/', requete)
        .subscribe(res => {
          window.location.reload();
          resolve(res);
        });
    });  
  }
}
