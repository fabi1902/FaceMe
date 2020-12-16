import { Component, OnInit } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { auth } from "firebase/app";
import * as firebase from "firebase";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
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
  isLoggedIn: boolean = false;

  async login() {
    if (this.Email != "" && this.Password != "") {
      //True
      console.log("Daten können verwendet werden");
      //this.afAuth.auth.signOut;
      //Local Persistance weil ich eingeloggt bleien will aber geht nicht richtig
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      try {
        await this.afAuth.auth
          .signInWithEmailAndPassword(this.Email, this.Password)
          .then((res) => {
            //Checken ob Login geklappt hat und dann auf Home seite weiterleiten
            this.isLoggedIn = true;
            console.log(firebase.auth().currentUser)
            this.router.navigate(["home"]);
          });
      } catch (err) {
        console.dir(err);
        if (err.code === "auth/user-not-found") {
          console.log("User wurde nicht gefunden!");
          this.msgUsernotExist();
        } else if (err.code === "auth/wrong-password") {
          console.log("Passwort falsch!");
          this.msgWrongPassword();
        }
      }
    } else {
      console.log("Achtung fehlende Infos");
    }
  }

  //Login mit Facebook
  async loginFacebook() {
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
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
  }

  //MessageBoxen

  async msgErrorMeldung() {
    const alert = await this.alertController.create({
      header: "Achtung!",
      subHeader: "Error!",
      message:
        "Das hätte nicht passieren dürfen!!",
      buttons: ["OK"],
    });
    await alert.present();
  }

  async msgWrongPassword() {
    const alert = await this.alertController.create({
      header: "Achtung!",
      subHeader: "Falsches Passwort!",
      message:
        "Das eingegebene Passwort stimmt nicht mit dem Benutzernamen überein!",
      buttons: ["OK"],
    });
    await alert.present();
  }

  async msgUsernotExist() {
    const alert = await this.alertController.create({
      header: "Achtung!",
      subHeader: "User nicht gefunden!",
      message: "Der eingegebene Benutzer wurde nicht gefunden!",
      buttons: ["OK"],
    });
    await alert.present();
  }

  logout() {
    this.afAuth.auth.signOut;
  }

  GoToRegister() {
    this.router.navigate(["register"]);
  }
}
