import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { CouponService } from '../coupon.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userService: UserService
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  fullName: string
  email: string
  pass: string
  couponService: CouponService

  validation_messages = {
    'email': [
      { type: 'required', message: 'mail obligatoire.' },
      { type: 'pattern', message: 'entrez un mail valide.' }
    ],
    'password': [
      { type: 'required', message: 'mot de passe obligatoire' },
      { type: 'minlength', message: 'doit contenir min. 5 charactères' }
    ],
    'nom': [
      { type: 'required', message: 'nom obligatoire' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    userService: UserService,
    couponService: CouponService,
    private alert: AlertController
  ) {
    this.userService = userService
    this.couponService = couponService
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      nom: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  register() {
    this.email = this.validations_form.get('email').value
    this.email = this.email.toLowerCase()
    this.fullName = this.validations_form.get('nom').value
    this.pass = this.validations_form.get('password').value
    this.userService.addUser(this.email, this.fullName, this.pass).subscribe(
      data => {
        console.log("POST Request is successful ", data);
        this.couponService.addCouponByuser(this.email,1).subscribe(data=>{
          this.presentAlert()
          this.navCtrl.navigateForward('/tabs/login');
        },error =>{
          console.log("error ajout coupon register")
        })


      },
      error => {

        console.log("Error", error);

      }


    );
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Votre compte a bien été créé. Merci de vous connecter.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
