import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { tabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class loginPage {
  
  username: string;
  password: string;

  username1 : string;
  password1: string;
  password2: string;
  
  errorL : string = '';
  errorR : string = '';

  constructor(public navCtrl: NavController, private http: Http ) {
    
  }

  login(){
    this.errorL = '';

    return new Promise(resolve => {
 
      var requete = {
        username : this.username,
        password : this.password
      };

      this.http.post('http://localhost:8030/getPasswordOfLogin/', requete)
        .map(res => res.json())
        .subscribe(res => {
          if( res.password != res.passwordToTest ){
            this.errorL = "Invalid username or password";
          }else{
            //LocalStorage pas safe, modifiable via navigateur, à améliorer pour une vrai application
            sessionStorage.setItem("loggedUser",this.username);
            
            this.navCtrl.push(tabsPage);
          }

          this.password = '';
          resolve(res.tasks);
      });
    }); 
  }

  register() {
    this.errorR = '';

    if( this.password1 == this.password2 ){

      return new Promise(resolve => {
        var requete = {
          username : this.username1,
          password : this.password2
        };

        this.http.post('http://localhost:8030/register/', requete)
          .map(res => res.json())
          .subscribe(res => {
            if( !res.available ){
              this.errorR = "Username not available";
            }else{
              //LocalStorage pas safe, modifiable via navigateur, à améliorer pour une vrai application
              sessionStorage.setItem("loggedUser",this.username1);

              this.navCtrl.push(tabsPage);
            }

            this.password1 = '';
            this.password2 = '';
            
            resolve(res.tasks);
        });
      });
    }else{
      this.errorR = "Your passwords do not match"
      this.password1 = '';
      this.password2 = '';
    }
  }
}
