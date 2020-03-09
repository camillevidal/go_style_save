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
                            this.addCouponByUser(Obcoupon.code)
                        });

                    }
                    catch{
                        console.log("Erreur dans la récupération du coupon")
                    }
                    finally {
                        this.savedCoupon()
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

    addCouponByUser(couponId) {
        let userId = localStorage.getItem("login")
        userId = "camille@mail.com"
        console.log("Add coupon by user infos : " + userId + " " + couponId)
        try {
            this.couponService.addCouponByuser(userId, couponId).subscribe(rep => {
                console.log(rep)
                if (rep == "Saved") {

                }

            })


        }
        catch{
            console.log("Erreur dans l'ajout du coupon")
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
