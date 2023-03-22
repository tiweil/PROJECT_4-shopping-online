import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ClientModel } from 'src/app/models/client.model';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { itemStore } from 'src/app/redux/item-state';
import { clientStore } from 'src/app/redux/login-state';
import { ItemService } from 'src/app/services/item.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {

  public client: ClientModel;
  public myCart: CartModel;
  public items: ItemModel[];
  public productItem: string;

  constructor(private itemService: ItemService,private router: Router) {}

  public toOrderPage(){
    this.router.navigateByUrl("/order");
  }

  public async ngOnInit() {
    try {
      this.myCart = clientStore.getState().cart;
      clientStore.subscribe(() => {
        this.myCart = clientStore.getState().cart;
      })
      this.items = await this.itemService.itemsByCart(this.myCart._id);
      itemStore.subscribe(() => {
        this.items = itemStore.getState().items;
      })
      console.log(this.items);
      } catch (error) {
      console.log(error);
    }
    }

  public async itemToCart() {
    try {
      clientStore.subscribe(() => {
        this.myCart = clientStore.getState().cart;
      })
      this.items = await this.itemService.itemsByCart(this.myCart._id);
      console.log(this.items);
      } catch (error) {
      console.log(error);
    }
  }
  public async deleteItem(id: string) {
    try {
      if(!window.confirm("Are you sure?")) return;
      await this.itemService.deleteItem(id);
      alert("Item has been deleted");
    } catch (err) {
      alert(err);
    }
  }

  public async deleteAll() {
    try {
      if(!window.confirm("Are you sure?")) return;
      await this.itemService.deleteAllItems(this.myCart._id);
      alert("Items has been deleted");
      this.items = await this.itemService.itemsByCart(this.myCart._id);
    } catch (err) {
      alert(err);
    }
  }


  getTotalCost() {
    return this.items.map(t => t.total_price).reduce((acc, value) => acc + value, 0);
  }
}

