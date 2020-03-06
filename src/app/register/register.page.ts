import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'mail obligatoire.' },
     { type: 'pattern', message: 'entrez un mail valide.' }
   ],
   'password': [
     { type: 'required', message: 'mot de passe obligatoire' },
     { type: 'minlength', message: 'doit contenir min. 5 charactères' }
   ],
   'nom':[
     {type:'required' , message:'nom obligatoire'}
   ]
 };

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
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

  tryRegister(value){
    
  }

  goLoginPage(){
    this.navCtrl.navigateBack('');
  }


}
