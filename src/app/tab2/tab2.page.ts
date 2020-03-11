import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { CouponService } from '../coupon.service';
import { NavController, AlertController } from '@ionic/angular';
import { Coupon } from '../types';
import { Platform } from '@ionic/angular';
import { timeoutWith } from 'rxjs/operators';


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
    plateformeAndroid : boolean

    constructor(private qrScanner: QRScanner, couponService: CouponService, private navCtrl: NavController, private alert: AlertController, private platform: Platform) {
        this.showCamera = false;
        this.couponService = couponService
        this.plateformeAndroid=platform.is("android")
        // this.platforme.backButton.subscribeWithPriority(0, () => {
        //     // document.getElementsByTagName("body")[0].style.visibility = "visible";
        //     // (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
        //     this.closeCamera();
        //     this.navCtrl.navigateForward('/tabs/tab3');
        // })
    }

    ngOnInit() {
        console.log("on init")
    }
    ionViewDidEnter() {
        this.scanCode()
        document.getElementById("appLogout").style.visibility = "hidden"
        var shadowroot = document.getElementById("contentCam").shadowRoot;
        var elem = (shadowroot.firstChild as HTMLElement)
        elem.style.opacity = "0"


    }
    ionViewDidLeave() {
        this.closeCamera()
        document.getElementById("appLogout").style.visibility = "visible"
        var shadowroot = document.getElementById("contentCam").shadowRoot;
        var elem = (shadowroot.firstChild as HTMLElement)
        elem.style.opacity = "1"

    }

    scanCode() {
        this.showCamera = true;
        // (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
        this.qrScanner.prepare().then((status: QRScannerStatus) => {
            if (status.authorized) {
                this.qrScanner.show();
                this.qrScan = this.qrScanner.scan().subscribe((qrScannerData: String) => {
                    this.closeCamera()
                    this.showCamera = false;
                    this.scannedCode = qrScannerData;
                    try{ 
                    this.scannedCode = atob(this.scannedCode);
                    this.scannedCode = parseInt(this.scannedCode)
                    }
                    catch{
                        this.alertWrongCoupon()
                        this.navCtrl.navigateForward('/tabs/tab3');
                        return;
                    }
                    try {
                        this.couponService.getCoupon(this.scannedCode).subscribe(Obcoupon => {
                            if (Obcoupon == null) {
                                this.alertWrongCoupon()
                            }
                            else {
                                try {
                                    this.couponService.checkCouponByUser(localStorage.getItem("login").toString()).subscribe(data => {
                                        let find = false
                                        for (const coup of data) {
                                            if (coup.code == Obcoupon.code) {
                                                find = true
                                                break;
                                            }
                                        }
                                        if (find == false) {
                                            this.addCouponByUser(Obcoupon)
                                        }
                                        else {
                                            this.alertDejaCoupon()
                                        }
                                    })

                                }
                                catch{
                                    this.alertWrongCoupon()
                                }
                            }
                        },
                            error => {
                                this.alertWrongCoupon();
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

    async alertDejaCoupon() {
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: "Coupon déjà ajouté.",
            buttons: ['OK']
        });

        await alert.present();
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

    async alertCouponSaved(coupon: Coupon) {
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: "Nouveau coupon ajouté : " + coupon.code_value,
            buttons: ['OK']
        });

        await alert.present();
    }

    async alertCouponid(id) {
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: "id = " + id,
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
        // (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
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
                console.log()
                if (rep == "Saved") {
                    this.alertCouponSaved(coupon)
                }
                else {
                    this.alertCouponNoSaved()
                }

            },
                error => {
                    this.alertCouponNoSaved()
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
