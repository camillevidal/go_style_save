import { Component, OnInit } from '@angular/core';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
// import { BarcodeScanner} from '@ionic-native/qr-scanner';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
//import { Dialogs } from '@ionic-native/dialogs/ngx';
//import { HTTP } from '@ionic-native/http';
//import { Observable } from 'rxjs';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    ngOnInit() {

        //this.showCamera = false;

    }


    /* qrData = null;
    scannedCode = null;
    showCamera = false;
    useLight = false;
    coupons = [];

    constructor(private qrScanner: QRScanner, public http: HTTP) {
        this.showCamera = false;
        this.getAllCouponByUser();

    }

    



    scanCode() {
        this.showCamera = true;

        // document.getElementById("cameraStuff").style.visibility = "visible";
        // document.getElementById("cameraHidden").style.visibility = "hidden";

        this.qrScanner.prepare().then((status: QRScannerStatus) => {
            if (status.authorized) {
                this.qrScanner.show();

                let scan = this.qrScanner.scan().subscribe((qrScannerData: String) => {

                    // this.dialogs.alert(qrScannerData);
                    this.scannedCode = qrScannerData;
                    this.scannedCode = this.scannedCode.result;
                    // console.dir(this.scannedCode)
                    // alert("Code : " + this.scannedCode.result)
                    this.qrScanner.hide();
                    scan.unsubscribe(); // stop scanning
                    this.showCamera = false;
                    this.getCoupon(this.scannedCode);
                })
            }
            else {
                this.qrScanner.hide();
                this.scannedCode = "None";
                this.showCamera = false;
            }

        })
    }

    closeCamera() {
        // this.dialogs.alert("closed !")
        this.showCamera = false;
        this.qrScanner.hide(); // hide camera preview
        this.qrScanner.destroy();
    }

    addLight() {
        if (this.useLight == false) {
            this.useLight = true;
            this.qrScanner.enableLight();
        }
        else {
            this.useLight = false;
            this.qrScanner.disableLight();
        }
    }

    getCoupon(urlText) {
        // let headerRequete = { 'Content-Type': 'application/x-www-form-urlencoded' }
        this.http.get(urlText, {}, {}).then(data => {

            let reponse = JSON.parse(data.data)

            this.scannedCode = reponse.code_value;
            // this.coupons.push(reponse)
            this.addCouponByUser("camille@yopmail.com", reponse.code);


        })
            .catch(error => {
                alert("Erreur get coupon : " + error.error)
                console.dir(error)
                // console.log(error.status);
                // console.log(error.error); // error message as string
                // console.log(error.headers);

            });
    }

    addCouponByUser(userId, couponId) {
        alert(userId + " " + couponId)
        this.http.post('http://109.11.21.53:9996/couponbyuser/add?idUser='+String(userId)+'&idCoupon='+String(couponId),
            {
                // idUser: userId,
                // idCoupon: couponId
            },
            {
                "Content-type": "application/json"
            })
            .then(data => {
                console.log(data.data)
                if(data.data == "Saved"){
                    alert("Le coupon a bien été ajouté.")
                    this.getAllCouponByUser(userId)
                }
                else{
                    alert("Une erreur est survenue.")
                }
            }).catch(error => {
                console.log(error.status);
                alert("error user coupon : " + error.status)
            });
    }

    getAllCouponByUser(userId="camille@yopmail.com"){
    
        this.coupons = []

        this.http.get("http://109.11.21.53:9996/couponbyuser/all", {}, {}).then(async data => {

            let reponse = JSON.parse(data.data)
            console.log(reponse)
            for (const coup of reponse) {
                console.log("Coupon : " + coup)
                if(coup.idUser == userId){
                    console.log(1)
                    let coupon = await this.getCouponInfo(coup.idCoupon)
                    console.log(3)
                    console.log("Actual coupon : " + JSON.parse(coupon))
                    this.coupons.push(JSON.parse(coupon))
                    console.log(this.coupons)
                }
            }

        })
            .catch(error => {
                alert("Erreur récup coupons : " + error.error)
                console.dir(error)

            });

    }

    getCouponInfo(idCoupon):any{
        this.http.get("http://109.11.21.53:9996/coupon/"+idCoupon, {}, {}).then(data => {

            let reponse = data.data
            console.log(2)
            console.log("REPONSE : " + reponse) 
            return reponse

        })
            .catch(error => {
                alert("Erreur récup info coupon : " + error.error)
                console.dir(error)
                return null;
            });
    } */
}