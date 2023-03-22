import { Component, HostListener, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { clientStore } from 'src/app/redux/login-state';
import { ItemService } from 'src/app/services/item.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { itemStore } from 'src/app/redux/item-state';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  public temp:ProductModel[]=[];
  public isExist:boolean=true;
  public products: ProductModel[];
  public allItems : ItemModel[];
  public categories: CategoryModel[];

  //DI= Dependency Injection, we get object kind of service
  //angular inject object by constructor to this component
  constructor(private productService: ProductService, private itemService: ItemService,private router: Router) {}

  buttonWidth = '85px'; // default button width

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    // get the window width
    const windowWidth = event.target.innerWidth;

    // change the button width based on some logic
    if (windowWidth < 500) {
      this.buttonWidth = '50px';
    } else if (windowWidth < 800) {
      this.buttonWidth = '75px';
    } else {
      this.buttonWidth = '100px';
    }
  }

  public async ngOnInit() {
    try {
      this.products = await this.productService.getAllProducts();
      this.temp=this.products;
      this.categories=await this.productService.getAllCategory();
      this.allItems =  itemStore.getState().items
      itemStore.subscribe(() => {
        this.allItems = itemStore.getState().items;
      })
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

  public async sortByCategory(data:any) {
    //this.products = await this.productService.getAllProducts();
    console.log("function is working",data)
    if(data=='all'){
      this.temp=this.products;
    }else{
      this.temp = await this.productService.getProductsByCategory(data);
    }
  }
  public searchItem(data:string){
    this.temp=this.products.filter(item=>{return item.name.includes(data)});
    console.log(this.temp.length)
    if(this.temp.length==0){
      this.isExist=false;
    }else{
      this.isExist=true;
    }
  }
}
