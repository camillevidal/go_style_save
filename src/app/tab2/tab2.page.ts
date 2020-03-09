import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { CouponService } from '../coupon.service';
import { NavController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Coupon } from '../types';
// import { Dialogs} from '@ionic-native/dialogs/ngx'
//import { HTTP } from '@ionic-native/http';
//import { Observable } from 'rxjs';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {



    qrData = null;
    qrScan:any;
    scannedCode = null;
    showCamera = false;
    useLight = false;
    coupons = [];
    couponService: CouponService

    constructor(public platforme:Platform,private qrScanner: QRScanner, couponService: CouponService,private navCtrl: NavController,private alert: AlertController) {
        this.showCamera = false;
        this.couponService = couponService
        this.platforme.backButton.subscribeWithPriority(0,()=>{
            // document.getElementsByTagName("body")[0].style.visibility = "visible";
            (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
            this.qrScan.unsubscribe();
            this.closeCamera();
        })
    }

    ngOnInit() {

        this.scanCode()

    }

    scanCode() {
        this.showCamera = true;
        console.log("Début scann");
        // document.getElementById("cameraStuff").style.visibility = "visible";
        // document.getElementById("background-content").style.display = "none";
        // document.getElementById("cameraHidden").style.visibility = "hidden";
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
        // (window.document.querySelector('#qrlogo') as HTMLElement).style.visibility = "visible !important"
        // document.getElementById("background-content").style.visibility = "hidden";
        this.qrScanner.prepare().then((status: QRScannerStatus) => {
            if (status.authorized) {
                this.qrScanner.show();
                // document.getElementsByTagName("body")[0].style.visibility = "hidden";
                console.log("show ok")
                this.qrScan = this.qrScanner.scan().subscribe((qrScannerData: String) => {
                    this.closeCamera()
                    this.showCamera = false;
                    console.log("SCANNER TROUVE")
                    // document.getElementsByTagName("body")[0].style.visibility = "visible";
                    this.scannedCode = qrScannerData;
                    this.scannedCode = this.scannedCode.result;
                    console.log("Code coupon : " + this.scannedCode)

                    // this.dialogs.alert(this.scannedCode)
                    try{
                        this.couponService.getCoupon(this.scannedCode).subscribe(Obcoupon =>{
                            console.log("Coupon description : " + Obcoupon.description)
                            console.log("call add coupon")
                            this.addCouponByUser(Obcoupon.code)
                        });
                           
                    }                 
                    catch{
                        console.log("Erreur dans la récupération du coupon")
                    }
                    finally{
                        console.log("closing camera")
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
        // document.getElementById("background-content").style.visibility = "visible";
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
        // document.getElementById("qrlogo").style.visibility = "hidden !important"

        this.showCamera = false;
        this.qrScan.unsubscribe(); // stop scanning
        this.qrScanner.hide(); // hide camera preview
        this.qrScanner.destroy();
        // document.getElementById("background-content")[0].style.display = "block";
        // window.document.body.style.backgroundColor = '#FFF';

    }

    addLight() {
        try{
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
        try{
            this.couponService.addCouponByuser(userId, couponId).subscribe(rep=>{
                console.log(rep)
                if(rep == "Saved"){
                    //alert("Code ajouté")
                }
                else{
                    //alert("Impossible d'ajouter le code")
                }
            })

            
        }
        catch{
            console.log("Erreur dans l'ajout du coupon")
        }
    }

    async savedCoupon(){
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: "Coupon Ajouté",
            buttons: ['OK']
        });
    
        await alert.present();
          
    }

}
