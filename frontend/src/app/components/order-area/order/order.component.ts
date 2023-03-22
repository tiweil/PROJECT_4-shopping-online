import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  public searchText="";
  
  constructor(private router:Router){}

  public toLayoutPage(){
    this.router.navigateByUrl("/layout-user");
  }
}
