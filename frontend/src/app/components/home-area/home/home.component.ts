import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';
import { ItemService } from 'src/app/services/item.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public products: ProductModel[];
  public amountOfProducts:number=0;
  public carts:CartModel[];

  constructor(private router:Router,private productService: ProductService, private itemService:ItemService) {}

  public backToMenu(){
    this.router.navigateByUrl("/layout-admin");
  }
  public async ngOnInit() {
    try {
      this.products = await this.productService.getAllProducts();
      this.carts= await this.itemService.getAllCarts();
      console.log(this.carts);
      // this.amountOfProducts=this.products.map(item=>{
      //   return this.amountOfProducts+=1;
      // })
    } catch (err) {
      alert(err);
    }
  }

}
