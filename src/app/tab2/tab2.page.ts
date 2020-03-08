import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { CouponService } from '../coupon.service';
import { Platform } from '@ionic/angular';
//import { Dialogs } from '@ionic-native/dialogs/ngx';
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

    constructor(public platforme:Platform,private qrScanner: QRScanner, couponService: CouponService) {
        this.showCamera = false;
        this.couponService = couponService
        this.platforme.backButton.subscribeWithPriority(0,()=>{
            document.getElementsByTagName("body")[0].style.opacity = "1";
            this.qrScan.unsubscribe();
        })
    }

    ngOnInit() {

        this.showCamera = false;

    }

    scanCode() {
        this.showCamera = true;
        console.log("Début scann");
        window.document.body.style.backgroundColor = 'transparent';

        // document.getElementById("cameraStuff").style.visibility = "visible";
        // document.getElementById("background-content").style.display = "none";
        // document.getElementById("cameraHidden").style.visibility = "hidden";

        this.qrScanner.prepare().then((status: QRScannerStatus) => {
            if (status.authorized) {
                this.qrScanner.show();
                document.getElementsByTagName("body")[0].style.opacity = "0";

                this.qrScan = this.qrScanner.scan().subscribe((qrScannerData: String) => {
                    console.log("SCANNER TROUVE")
                    document.getElementsByTagName("body")[0].style.opacity = "1";
                    // this.dialogs.alert(qrScannerData);
                    this.scannedCode = qrScannerData;
                    this.scannedCode = this.scannedCode.result;
                    // console.dir(this.scannedCode)
                    // alert("Code : " + this.scannedCode.result)
                    this.qrScanner.hide();
                    this.qrScan.unsubscribe(); // stop scanning
                    this.showCamera = false;
                    try{
                        this.couponService.getCoupon(this.scannedCode);
                    }
                    catch{
                    }
                    finally{
                        this.closeCamera();
                    }
                })
            }
            else {
                this.scannedCode = "None";
                this.closeCamera()

            }

        })
    }

    closeCamera() {
        this.showCamera = false;
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
        alert(userId + " " + couponId)
        this.couponService.addCouponByuser(userId, couponId)
    }

}
