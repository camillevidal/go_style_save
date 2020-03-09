import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { CouponService } from '../coupon.service';
import { NavController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Coupon } from '../types';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    qrData = null;
    qrScan: any;
    scannedCode = null;
    showCamera = false;
    useLight = false;
    coupons = [];
    couponService: CouponService

    constructor(public platforme: Platform, private qrScanner: QRScanner, couponService: CouponService, private navCtrl: NavController, private alert: AlertController) {
        this.showCamera = false;
        this.couponService = couponService
        this.platforme.backButton.subscribeWithPriority(0, () => {
            // document.getElementsByTagName("body")[0].style.visibility = "visible";
            (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
            this.qrScan.unsubscribe();
            this.closeCamera();
        })
    }

    ngOnInit() {
        console.log("on init")
    }
    ionViewDidEnter() {
        this.scanCode()
        document.getElementById("appLogout").style.visibility = "hidden"

    }
    ionViewDidLeave() {
        this.closeCamera()
        document.getElementById("appLogout").style.visibility = "visible"


    }

    scanCode() {
        this.showCamera = true;
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
        this.qrScanner.prepare().then((status: QRScannerStatus) => {
            if (status.authorized) {
                this.qrScanner.show();
                this.qrScan = this.qrScanner.scan().subscribe((qrScannerData: String) => {
                    this.closeCamera()
                    this.showCamera = false;
                    this.scannedCode = qrScannerData;
                    this.scannedCode = this.scannedCode.result;
                    console.log("Code coupon : " + this.scannedCode)
                    try {
                        this.couponService.getCoupon(this.scannedCode).subscribe(Obcoupon => {
                            if(Obcoupon == null){
                                throw new Error("Erreur");
                                
                            }
                            else{
                                this.addCouponByUser(Obcoupon)
                            }
                        });
                    }
                    catch{
                        console.log("Erreur dans la récupération du coupon")
                        this.alertWrongCoupon()
                    }
                    finally {
                        this.navCtrl.navigateForward('/tabs/tab3');
                    }
                })
            }
            else {
                this.scannedCode = "None";
                this.closeCamera()
                this.navCtrl.navigateForward('/tabs/tab3');

            }

        })

    }

    async alertWrongCoupon() {
        const alert = await this.alert.create({
          header: 'Alert',
          subHeader: 'Subtitle',
          message: "Coupon incorrect.",
          buttons: ['OK']
        });
    
        await alert.present();
      }

    async alertCouponSaved(coupon:Coupon) {
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: "Nouveau coupon ajouté : " + coupon.code_value,
            buttons: ['OK']
    });

    await alert.present();
    }

    async alertCouponNoSaved() {
    const alert = await this.alert.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: "Erreur dans l'ajout du coupon, veuillez réessayer",
        buttons: ['OK']
    });

    await alert.present();
    }

    closeCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
        this.showCamera = false;
        this.qrScan.unsubscribe(); // stop scanning
        this.qrScanner.hide(); // hide camera preview
        this.qrScanner.destroy();


    }

    addLight() {
        try {
            if (this.useLight == false) {
                this.useLight = true;
                this.qrScanner.enableLight();
            }
            else {
                this.useLight = false;
                this.qrScanner.disableLight();
            }
        }
        catch{
            console.log("Impossible d'activer la lumière.")
        }
    }

    addCouponByUser(coupon) {
        let userId = localStorage.getItem("login")
        console.log("Add coupon by user infos : " + userId + " " + coupon.code)
        try {
            this.couponService.addCouponByuser(userId, coupon.code).subscribe(rep => {
                console.log(rep)
                if (rep == "Saved") {
                    this.alertCouponSaved(coupon)
                }
                else{
                    this.alertCouponNoSaved()
                }

            })

        }
        catch{
            this.alertCouponNoSaved()
        }
    }

    async savedCoupon() {
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: "Coupon Ajouté",
            buttons: ['OK']
        });

        await alert.present();

    }

}
