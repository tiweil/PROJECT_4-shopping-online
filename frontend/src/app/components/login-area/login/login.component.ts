import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public existsClient = new ClientModel();

  public backToHome(){
    this.router.navigateByUrl("/home");
  }

  public myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private loginService: LoginService,  private router: Router ) {}

  public async send() {
    this.existsClient.email = this.myForm.get('email').value;
    this.existsClient.password=this.myForm.get('password').value;
    //console.log(this.existsClient);
    try {
      const isClient = await this.loginService.login(this.existsClient);
      switch(isClient.role) {

        case 1:
          alert(`welcome admin ${isClient.first_name}`);
          //ליוט אדמין
          this.router.navigateByUrl("/layout-admin");
          break;

        case 2:
          alert(`welcome back ${isClient.first_name}! enjoy shopping`);
            //layout-user
          this.router.navigateByUrl("/layout-user");
          break;
      }
    } catch (err:any) {
      alert("Did you signed before? please register here or maybe one of the failed is wrong");
      console.log(err.message);
    }
  }

}
