import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
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
  fullName: String
  email: String
  pass: String

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
    private alert: AlertController
  ) {
    this.userService = userService
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
    this.fullName = this.validations_form.get('nom').value
    this.pass = this.validations_form.get('password').value
    this.userService.addUser(this.email, this.fullName, this.pass).subscribe(
      data => {
        console.log("POST Request is successful ", data);
        this.presentAlert()


      },
      error => {

        console.log("Error", error);

      }


    );;
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Profil crée avec succès.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
