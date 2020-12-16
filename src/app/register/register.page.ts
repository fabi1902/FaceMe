import { Component, OnInit } from "@angular/core";
//import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
//import { auth } from "firebase/app";
import * as firebase from "firebase";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user != null) {
      // User wird auf Home seite weitergeleitet!
      console.log("User ist bereits eingeloggt und wird zu Home weitergeleitet!");
      this.router.navigate(["home"]);
    }
  }

  Email: string = "";
  Password: string = "";
  cPassword: string = "";

  async register() {
    if (this.Email != "" && this.Password != "" && this.cPassword != "") {
      if (this.Password == this.cPassword) {
        console.log("Daten können verwendet werden");
        try {
          await this.afAuth.auth
            .createUserWithEmailAndPassword(this.Email, this.Password)
            .then((res) => {
              this.router.navigate(["home"]);
            });
        } catch (err) {
          console.dir(err);
          console.dir(err.code);
          if (err.code == "auth/weak-password") {
            this.msgUnsafePassword();
          } else if (err.code == "auth/invalid-email") {
            this.msgInvalidEmail();
          }
          // Error abfangen zb PW zu einfach oder zu kurz oder in Email keine gültige Email adresse eingegeben!
        }
      } else {
        console.log("Passwörter stimmen nicht überein!");
      }
    } else {
      console.log("Achtung fehlende Infos");
    }
  }

  async msgUnsafePassword() {
    const alert = await this.alertController.create({
      header: "Achtung!",
      subHeader: "Passwort zu unsicher!",
      message: "Das eingegebene Passwort ist zu unsicher!",
      buttons: ["OK"],
    });
    await alert.present();
  }

  async msgInvalidEmail() {
    const alert = await this.alertController.create({
      header: "Achtung!",
      subHeader: "Keine Email eingegeben!",
      message: "Die eingegebene Email ist keine gültige Email!",
      buttons: ["OK"],
    });
    await alert.present();
  }

  //Register mit Facebook
  async registerFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();

    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        //Checken ob Login geklappt hat und dann auf Home seite weiterleiten
        console.log("Erfolgreich eingeloggt mit Facebook");
        this.router.navigate(["home"]);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        this.msgError();
      });
  }

  async msgError() {
    const alert = await this.alertController.create({
      header: "Achtung!",
      subHeader: "Fehler!!",
      message: "Ein Fehler ist aufgetreten, das hätte nicht passieren dürfen!",
      buttons: ["OK"],
    });
    await alert.present();
  }

  //Weiter zur Anmeldung
  GoToLogin() {
    this.router.navigate(["login"]);
  }
}
