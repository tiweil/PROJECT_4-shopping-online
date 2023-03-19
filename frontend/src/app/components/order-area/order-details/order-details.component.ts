import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { clientStore } from 'src/app/redux/login-state';
import { ItemService } from 'src/app/services/item.service';

//רק לבדיקה
export interface Transaction {
  item: string;
  qty:number;
  cost: number;
}


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  public myCart: CartModel;
  public items: ItemModel[];
  public allItems :ItemModel[];
  public allProducts: ProductModel[];
  public temp:ProductModel[];
  @Input() isModal:boolean;
  constructor(private itemService: ItemService,private router: Router) {}

  public searchItem(data:string){
    const regex: RegExp = new RegExp(data, 'gi');

    this.temp=this.allProducts.filter(item=>{return item.name.includes(data)});
    this.temp.map(item=>{
      item.name=item.name.replace(regex, '<mark>$&</mark>');
    })
  }
  public async ngOnInit(){
    try{
      this.myCart = clientStore.getState().cart;
      //listening to changes
      clientStore.subscribe(() => {
        this.myCart = clientStore.getState().cart;
      })

      this.items = await this.itemService.itemsByCart(this.myCart._id);
      console.log(this.items[0].productId);
    }catch(error){
      console.log(error);
    }

  }

  public toLayoutPage(){
    this.router.navigateByUrl("/layout-user");
  }
    displayedColumns = ['item','qty', 'cost'];
    transactions: Transaction[] = [
      {item: 'Beach ball',qty:5, cost: 4},
      {item: 'Towel',qty:20, cost: 5},
      {item: 'Frisbee',qty:6, cost: 2},
      {item: 'Sunscreen',qty:78, cost: 100},
      {item: 'Cooler',qty:15, cost: 25},
      {item: 'Swim suit',qty:77, cost: 15},
    ];

    /** Gets the total cost of all transactions. */
    getTotalCost() {
      return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    }
}
