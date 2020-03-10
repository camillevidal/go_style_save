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
    plateformeAndroid: boolean

    constructor(public platforme: Platform, private qrScanner: QRScanner, couponService: CouponService, private navCtrl: NavController, private alert: AlertController) {
        this.showCamera = false;
        this.couponService = couponService
        this.plateformeAndroid = this.platforme.is("android")
        console.log("Android : " + this.platforme.is("android"))
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
        this.qrScanner.prepare().then((status: QRScannerStatus) => {
            if (status.authorized) {
                this.qrScanner.show();
                this.qrScan = this.qrScanner.scan().subscribe((qrScannerData: String) => {
                    this.scannedCode = qrScannerData;
                    this.scannedCode = this.scannedCode.result;
                    this.scannedCode = atob(this.scannedCode)
                    this.scannedCode = parseInt(this.scannedCode)
                    this.closeCamera()
                    this.showCamera = false;
                    try {
                        this.couponService.getCoupon(this.scannedCode).subscribe(Obcoupon => {
                            if(Obcoupon == null){
                                this.alertWrongCoupon()                                
                            }
                            else{
                                try{
                                    this.couponService.checkCouponByUser(localStorage.getItem("login").toString()).subscribe(data=>{
                                        let find = false
                                        for (const coup of data) {
                                            if(coup.code == Obcoupon.code){
                                                find = true
                                                break;
                                            }else{
                                                continue;
                                            }
                                        }
                                        if(find == false){
                                            this.addCouponByUser(Obcoupon)
                                        }
                                        else{
                                            this.alertDejaCoupon()
                                        }
                                    }, error=>{
                                        this.alertCouponNoSaved()
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

    async alertDejaCoupon(){
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
        this.showCamera = false;
        this.qrScan.unsubscribe(); // stop scanning
        this.qrScanner.hide(); // hide camera preview
        this.qrScanner.destroy();


    }

    addLight() {
        try {
            if (this.useLight == false) {
                this.useLight = true;
                this.qrScanner.enableLight().catch(error =>{
                    this.errorLight();
                    this.useLight = false;
                });
            }
            else {
                this.useLight = false;
                this.qrScanner.disableLight();
            }
        }
        catch{
            this.errorLight();
        }
    }

    addCouponByUser(coupon) {
        let userId = localStorage.getItem("login")
        try {
            this.couponService.addCouponByuser(userId, coupon.code).subscribe(rep => {
                if (rep == "Saved") {
                    this.alertCouponSaved(coupon)
                    this.scannedCode = null
                    this.qrScan = null
                }
                else{
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

    async errorLight() {
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: "Impossible d'activer la lumière.",
            buttons: ['OK']
        });

        await alert.present();

    }

}
