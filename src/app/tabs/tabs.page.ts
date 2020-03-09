import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  href: string;

  constructor(public alertController: AlertController, private navCtrl: NavController, private router: Router) {

  }
  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>Voulez vous, vous déconnecter ?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.goToLogin()
          }
        }
      ]
    });

    await alert.present();
  }
  goToLogin() {
    localStorage.removeItem("login")
    this.navCtrl.navigateForward('tabs/login');
    let hide = document.getElementById("logged")
    hide.style.visibility = "hidden"
  }
}
