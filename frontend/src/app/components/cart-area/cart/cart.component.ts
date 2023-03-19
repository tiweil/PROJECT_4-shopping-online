// import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import { ItemModel } from 'src/app/models/item.model';
// import { ProductModel } from 'src/app/models/product.model';
// import { ProductActionType, productsStore } from 'src/app/redux/product-state';
// import { ProductService } from 'src/app/services/product.service';


// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {

// public products: ProductModel[] ;
// public singleProduct: ProductModel[];

// @Input()
// public item: ItemModel;
// @Input()
// public product: string;
// @Output()
// public deleteMe = new EventEmitter<string>();


// constructor(private productService: ProductService) {
//   console.log(this.product);
//   console.log(this.item);
//   this.productService.getAllProducts();
//   this.products = productsStore.getState().products;
//   console.log("all products"+this.products);
//   //this.singleProduct = this.products.filter(p =>{ });
//   //this.nameProduct = this.singleProduct[0].name;
// }
// public async ngOnInit() {
//   this.productService.getAllProducts();
//   this.products = productsStore.getState().products;
//   //console.log("all products"+this.products[0]);
//   this.item.qty = 1;
// }
// public onQuantityChange() {
//   this.item.total_price = this.item.qty*this.singleProduct[0].price;
// }
// public async deleteItem() {
//   this.deleteMe.emit(this.item._id);
// }
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductActionType, productsStore } from 'src/app/redux/product-state';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

@Input()
public item: ItemModel;

@Output()
public deleteMe = new EventEmitter<string>();

public async ngOnInit() {

}
public onQuantityChange() {
  this.item.total_price = this.item.qty*this.item.productId.price;
}
public async deleteItem() {
  this.deleteMe.emit(this.item._id);
}








}
