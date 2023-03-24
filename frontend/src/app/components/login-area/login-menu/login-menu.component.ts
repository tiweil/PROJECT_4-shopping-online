import { ClientModel } from './../../../models/client.model';
import { Component, OnInit } from '@angular/core';
import { clientStore } from 'src/app/redux/login-state';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {
  public client: ClientModel;

  constructor(private loginService: LoginService){}
  ngOnInit(): void {
    this.client = clientStore.getState().client;
    //listening to changes
    clientStore.subscribe(() => {
      this.client = clientStore.getState().client;
    })
  }
  public logout(){
    alert("good bye");
    this.loginService.logout();
  }
}
