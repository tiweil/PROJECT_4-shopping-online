import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { clientStore } from 'src/app/redux/login-state';
import { ItemService } from 'src/app/services/item.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  public products: ProductModel[];
  //DI= Dependency Injection, we get object kind of service
  //angular inject object by constructor to this component
  constructor(private productService: ProductService, private itemService: ItemService,private router: Router) {}

  public async ngOnInit() {
    try {
      this.products = await this.productService.getAllProducts();
    } catch (err) {
      alert(err);
    }
  }

  public backToMenu(){
    this.router.navigateByUrl("/layout-admin");
  }

  public async deleteProduct(id: string) {
    console.log(id);
    try {
      if(!window.confirm("Are you sure?")) return;
      await this.productService.deleteProduct(id);
      alert("Product has been deleted");
    } catch (err) {
      alert(err);
    }
  }


}
