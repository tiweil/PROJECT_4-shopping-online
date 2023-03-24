import {Component, ElementRef, Input, OnInit, PipeTransform, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { itemStore } from 'src/app/redux/item-state';
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
export class OrderDetailsComponent implements OnInit,PipeTransform{
  public myCart: CartModel;
  public items: ItemModel[];
  public allItems :ItemModel[];
  public allProducts: ProductModel[];
  public temp:ItemModel[];
  public searchText="";

  //for to search item
  public  searchInput: string = '';
  @ViewChild('textToHighlight') textToHighlight: ElementRef;

  @Input() isModal:boolean;
  constructor(private itemService: ItemService,private router: Router) {}

  highlightText() {
    const query = this.searchInput.toLowerCase();
    const text = this.textToHighlight.nativeElement.innerHTML;
    const highlighted = text.replace(new RegExp(query, 'gi'), `<span class="highlight">${query}</span>`);
    this.textToHighlight.nativeElement.innerHTML = highlighted;
  }
  transform(value: string, searchInput: string): string {
    if (!searchInput) {
      return value;
    }
    const pattern = new RegExp(searchInput, 'gi');
    return value.replace(pattern, '<span class="highlight">$&</span>');
  }
  // public searchItem(data:string){
  //   const regex: RegExp = new RegExp(data, 'gi');

  //   this.temp=this.items.filter(item=>{return item.productId.name.includes(data)});
  //   this.temp.map(item=>{
  //     item.productId.name=item.productId.name.replace(regex, '<mark>$&</mark>');
  //   })
  // }
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

  public toLayoutPage(){
    this.router.navigateByUrl("/layout-user");
  }
    displayedColumns = ['item','qty', 'cost'];
    // transactions: Transaction[] = [
    //   {item: 'Beach ball',qty:5, cost: 4},
    //   {item: 'Towel',qty:20, cost: 5},
    //   {item: 'Frisbee',qty:6, cost: 2},
    //   {item: 'Sunscreen',qty:78, cost: 100},
    //   {item: 'Cooler',qty:15, cost: 25},
    //   {item: 'Swim suit',qty:77, cost: 15},
    // ];

    /** Gets the total cost of all transactions. */
    getTotalCost() {
      return this.items.map(t => t.total_price).reduce((acc, value) => acc + value, 0);
    }
}
