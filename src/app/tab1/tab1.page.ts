import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(public alertController: AlertController, private router:Router) {}

  name: string = "Fabi";
  email: string;
  passwort: string;

  ClickSave() {
    //this.email = "";
    console.log(this.email);
    console.log(this.passwort);
    this.AlertMe();
    //alert('Du hast erfolgreich gespeichert!')
    console.log("Werte wurden gespeichert!");
  }

  async AlertMe() {
    const AlertMeNow = await this.alertController.create({
      header: "Meldung!",
      subHeader: "Datenspeicherung",
      message: "Daten wurden erfolgreich gespeichert!",
      buttons: ["OK", "Cancel"],
    });

    await AlertMeNow.present();
  }

  GoToLogin() {
    this.router.navigate(["login"]);
    console.log("Du bist zu Login gegangen")
  }
}
