import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ClientModel } from 'src/app/models/client.model';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
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
public temp: ItemModel[];

constructor(private itemService: ItemService,private router: Router) {}

public toOrderPage(){
  this.router.navigateByUrl("/order");
}

public async ngOnInit() {
  try {
    this.myCart = clientStore.getState().cart;
    //listening to changes
    clientStore.subscribe(() => {
      this.myCart = clientStore.getState().cart;
    })
    this.items = await this.itemService.itemsByCart(this.myCart._id);

    this.temp=this.items;
    } catch (error) {
    console.log(error);
  }
  }

public async itemToCart() {
  try {
    this.myCart = clientStore.getState().cart;
    //listening to changes
    clientStore.subscribe(() => {
      this.myCart = clientStore.getState().cart;
    })
    this.items = await this.itemService.itemsByCart(this.myCart._id);
    this.temp=this.items;
    } catch (error) {
    console.log(error);
  }
}
public async deleteItem(id: string) {
  console.log(id);
  try {
    if(!window.confirm("Are you sure?")) return;
    await this.itemService.deleteItem(id);
    alert("Product has been deleted");
    this.items = await this.itemService.itemsByCart(this.myCart._id);
    this.temp=this.items;
  } catch (err) {
    alert(err);
  }
}

}

