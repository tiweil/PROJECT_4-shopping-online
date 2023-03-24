import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
// import { ProductModel } from 'src/app/models/product.model';
import { itemStore } from 'src/app/redux/item-state';
import { clientStore } from 'src/app/redux/login-state';

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
  searchTerm: string;
  public myCart: CartModel;
  public items: ItemModel[];
  // public allItems :ItemModel[];
  // public allProducts: ProductModel[];
  public temp:ItemModel[];
  public searchText="";
  displayedColumns = ['item','qty', 'cost'];

  //for to search item
  // public  searchInput: string = '';
  // @ViewChild('textToHighlight') textToHighlight: ElementRef;

  @Input() isModal:boolean;
  constructor(private router: Router) {}


  public async ngOnInit() {
    try {
      this.myCart = clientStore.getState().cart;
      //listening to changes
      clientStore.subscribe(() => {
        this.myCart = clientStore.getState().cart;
      })

     //this.items = await this.itemService.itemsByCart(this.myCart._id);
     this.items =  itemStore.getState().items
     itemStore.subscribe(() => {
       this.items = itemStore.getState().items;
     })
      console.log(this.items);
      // this.productItem = this.items[0].productId;
      console.log(this.items[0].productId);
      this.temp=this.items;
      } catch (error) {
      console.log(error);
    }
   }
   //to search and marker by typing
  updateSearch(e:any) {
    this.searchTerm = e.target.value
  }
  //back to shopping
  public toLayoutPage(){
    this.router.navigateByUrl("/layout-user");
  }


    /** Gets the total cost of all transactions. */
    getTotalCost() {
      return this.items.map(t => t.total_price).reduce((acc, value) => acc + value, 0);
    }
}
