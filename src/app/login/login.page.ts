import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { User } from 'src/user';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  user: User = null

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private userService: UserService) {


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
    });
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


  loginUser() {
    let email = this.validations_form.get('email').value
    let password = this.validations_form.get('password').value
    var hash = sha256.create();
    hash.update(password);
    hash.hex();
    this.userService.login(email).subscribe(value => {
      this.user = value
      if(this.user == null){
        alert("Utilisateur inconnu")
        this.navCtrl.navigateForward('/tabs/register');
      }
      
      else if (this.user.password == hash.toString()) {
        localStorage.setItem("login",email)
        this.navCtrl.navigateForward('/tabs/tab2');
      }
      else{
        alert("erreur sur les identifiants")
      }
     
    })
    
    

  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/tabs/register');
  }

}
