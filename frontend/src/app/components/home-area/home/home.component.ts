import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { ItemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public products: ProductModel[];
  public amountOfProducts:number=0;
  public amountOfOrders:number=0;
  public orders:OrderModel[];
  //DI= Dependency Injection, we get object kind of service
  //angular inject object by constructor to this component
  constructor(private router:Router,private productService: ProductService, private itemService:ItemService, private orderService:OrderService) {}
  public backToMenu(){
    this.router.navigateByUrl("/layout-admin");
  }
  public async ngOnInit() {
    try {
      this.products = await this.productService.getAllProducts();
      this.orders= await this.orderService.getAllOrders();
      console.log(this.orders);
      this.amountOfProducts=this.products.length;
      this.amountOfOrders=this.orders.length;
      // this.amountOfProducts=this.products.map(item=>{
      //   return this.amountOfProducts+=1;
      // })
    } catch (err) {
      alert(err);
    }
  }

}
