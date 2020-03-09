import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public alertController: AlertController,private navCtrl: NavController) {}
  async logout(){
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
  goToLogin(){
    this.navCtrl.navigateForward('/login');
  }

}
