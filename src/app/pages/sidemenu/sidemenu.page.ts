import { Component, OnInit } from '@angular/core';
import * as faker from 'faker/locale/es_MX'
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  pages = [
    { title: 'Servicios',             icon: 'construct-outline',        url: '/sidemenu/services'},
    { title: 'Mensajes',              icon: 'chatbox-ellipses-outline', url: '/sidemenu/messages'},
    { title: 'Valoraciones',          icon: 'star-outline',             url: '/sidemenu/ratings'},
    { title: 'Configuración y Pagos', icon: 'settings-outline',         url: '/sidemenu/preferences'},
    { title: 'Facturas',              icon: 'receipt-outline',          url: '/sidemenu/invoices'},
    { title: 'Ayuda',                 icon: 'help-circle-outline',      url: '/sidemenu/help'},
  ]

  selectedPath = ''
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  user: User

  constructor(
    private auth: AuthService
  ) {  }
  
  ngOnInit() {
    this.user = this.auth.userData()
    if (localStorage.getItem('darkMode') === 'on') {
      document.body.setAttribute('data-theme', 'dark');
      this.darkMode = true
    } else {
      document.body.setAttribute('data-theme', 'light');
      this.darkMode = false
    }
  }
  
  ionViewWillEnter() {
    this.user = this.auth.userData()
    console.log('hola');
  }

  logout() {
    this.auth.logout()
  }

  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('darkMode', 'on');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('darkMode', 'off');
    }
  }

  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches || localStorage.getItem('darkMode') === 'on') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

}
