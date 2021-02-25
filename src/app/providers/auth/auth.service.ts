import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private api: ApiService,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public router: Router, // para enviar al usuario a otra vista
    private navController: NavController,
    public toastCtrl: ToastController,
    private loadingController: LoadingController
  ) { }

  async login(userCredentials) {
    const loading = await this.loadingController.create({
      message: 'Ingresando...'
    });
    await loading.present()
    this.api.login(userCredentials.email, userCredentials.password)
      .subscribe(
        (userData: any) => {
          console.table(userData)
          localStorage.setItem('user', JSON.stringify(userData.user));
          this.ngZone.run(() => {
            this.router.navigate(['/sidemenu/services']);
            loading.dismiss()
          });
        }, err => {
          loading.dismiss()
          let errMessage
          switch (err.error.message) {
            case 'User is not a client':
              errMessage = 'Usuario no registrado.'
              break
            default:
              errMessage = 'Email y/o contraseña incorrectas.'
              break
          }
          this.presentToast(errMessage, 'danger');
        }
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.ngZone.run(() => {
      this.navController.navigateRoot(['login'])
    });
  }

  isLogged() {
    if (localStorage.getItem("user") == null) {
      return false;
    }
    else {
      return true;
    }
  }

  userData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // user_id, name, lastName, email

  setUserData(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
