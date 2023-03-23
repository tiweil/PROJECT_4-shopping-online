import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public newClient = new ClientModel();
  public myCountry:string = "israel";
  public cities: any[];
  public filteredCities: string[] = [];
  public myForm: FormGroup;
  hide = true;

constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router:Router ) {
this.myForm = this.formBuilder.group({
  first_name: ['', Validators.required],
  last_name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  id_num: ['', Validators.required],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: [''],
  city: ['', Validators.required],
  street: ['', Validators.required]
}, { validator: this.passwordMatchValidator });
}

public async ngOnInit() {
  this.cities = await this.loginService.getCities(this.myCountry);
  }

 // custom validator to check if password and confirmPassword fields match
passwordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password').value;
  const confirmPassword = formGroup.get('confirmPassword').value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

public filterCities(searchText: any): void {
  console.log(searchText);

  this.filteredCities = this.cities.filter(city => city.toLowerCase().includes(searchText.toLowerCase()));
  console.log(this.filteredCities);

}

public async send() {
  if (this.myForm.invalid) {
    // Mark all form controls as touched to trigger the display of validation errors
    Object.values(this.myForm.controls).forEach(control => {
      control.markAsTouched();
    });
    // Prevent the form from submitting
    return;
  }

  // If the form is valid, proceed with sending the data to the backend
  const formData = this.myForm.value;
  this.newClient = new ClientModel();
  this.newClient.first_name = formData.first_name;
  this.newClient.last_name = formData.last_name;
  this.newClient.email = formData.email;
  this.newClient.id_num = formData.id_num;
  this.newClient.password = formData.password;
  this.newClient.city = formData.city;
  this.newClient.street = formData.street;
  console.log(this.newClient);
  try{
    await this.loginService.register(this.newClient);
    alert(`welcome ${this.newClient.first_name}!`);
    this.router.navigateByUrl("/products");
  }
  catch(err:any){
    console.log(err);
    alert(err);
  }
}

}


