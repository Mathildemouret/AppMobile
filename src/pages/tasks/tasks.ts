import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'tasks.html'
})

export class tasksPage {
  tasks: any;

  constructor( private http: Http ) {
  
    this.getAllTasksFromAuthor().then((data)=>
    {
      this.tasks = data;
    });
    
  }

  getAllTasksFromAuthor() {
 
    return new Promise(resolve => {
 
      var requete = {
        author : sessionStorage.getItem("loggedUser")
      };

      this.http.post('http://appwebpolytechpartie1.herokuapp.com/getAllTasksFromAuthor/', requete)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res.tasks);
        });
    });  
  }

  removeTask( _id ){
    return new Promise(resolve => {

      var requete = {
        _id : _id
      };
  
      this.http.post('http://appwebpolytechpartie1.herokuapp.com/removeTask', requete )
        .subscribe(res => {
          this.getAllTasksFromAuthor().then((data)=>
          {
            this.tasks = data;
          });
          resolve(res);
      });
    });
  }

  setStatusTask( _id, done ){
    return new Promise(resolve => {

      var requete = {
        _id : _id,
        done : done
      };
    
      this.http.post('http://appwebpolytechpartie1.herokuapp.com/setStatusTask', requete )
      .subscribe(res => {
        this.getAllTasksFromAuthor().then((data)=>
        {
          this.tasks = data;
        });
        resolve(res);
    });
    });
  }

}
