import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { show, hide} from 'src/store/loading/loading.actions';
import { recoverPassword, recoverPasswordSuccess } from 'src/store/login/login.action';
import { LoginState } from 'src/store/login/LoginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  form: FormGroup;
  

  constructor(private router: Router, private formBuilder: FormBuilder,
    private store: Store<AppState>, private toastController : ToastController,
    private authService : AuthService) { 

  }

  ngOnInit() {
  
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.store.select('login').subscribe( async loginState => {
      this.onIsRecoveringPassword(loginState);
      this.onIsRecoveredPassword(loginState);
      
    })
  }

  private onIsRecoveringPassword(loginState : LoginState){
    if (loginState.isRecoveringPassword){
      this.store.dispatch(show());

      this.authService.revoverEmailPassword(this.form.get('email').value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess());
      })
    }
  }

  private async onIsRecoveredPassword(loginState : LoginState){
    if (loginState.isRecoveredPassword){
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position : "bottom",
        message : "Recovery email sent",
        color : "primary"
      });
      toaster.present();
    }
  }

  forgotEmailPassword(){
    this.store.dispatch(recoverPassword());
  }

  login(){
    this.router.navigate(['home']); 
  }

  register() {
    this.router.navigate(['register']);
  }

}
