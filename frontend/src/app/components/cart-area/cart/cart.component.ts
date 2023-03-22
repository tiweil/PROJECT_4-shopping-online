import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductActionType, productsStore } from 'src/app/redux/product-state';
import { ProductService } from 'src/app/services/product.service';
import { ItemService } from 'src/app/services/item.service';

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
constructor(private itemService: ItemService) {}
public async ngOnInit() {

}
public async onQuantityChange() {
  this.item.total_price = this.item.qty*this.item.productId.price;
  await this.itemService.updateItem(this.item);
}
public async deleteItem() {
  this.deleteMe.emit(this.item._id);
}








}
