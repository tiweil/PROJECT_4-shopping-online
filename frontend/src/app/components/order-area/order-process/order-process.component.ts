import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderModel } from 'src/app/models/order.model';
import { clientStore } from 'src/app/redux/login-state';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderCompleteComponent } from '../order-complete/order-complete.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemModel } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { CartModel } from 'src/app/models/cart.model';

//בשביל חסימת תאריכים
export interface Times {
    date:string;
    times:number;
}

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.css']
})
export class OrderProcessComponent implements OnInit{
  public cities: any[];
  public filteredCities: string[] = [];
  public myForm: FormGroup;
  public myCountry:string = "israel";
  public newOrder = new OrderModel();
  public isActive:boolean=false;
  public allOrders:OrderModel[];
  public items:ItemModel[];
  public sum:number=0;
  public myCart:CartModel;
  blockedDates: Date[];
  // public Times:object={

  // };

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private loginService: LoginService,
              private itemService:ItemService,
              public dialog: MatDialog ) {
    this.myForm = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      arrival_date:['',Validators.required],
      last_fourCC:['',[Validators.required,Validators.pattern(/^[0-9]*$/),Validators.maxLength(16),Validators.minLength(16)]],
      // sum:['',Validators.required],
    });

    }

    public checkDates(orders:OrderModel[]){
      let temp:Date[]=[];
      // let counter:number;
      console.log(temp)
      // let allTimes:Times[];
      for(let i=0,counter=0;i<orders.length;i+=1){
        console.log(orders[i])
        console.log((orders[i].arrival_date).toString().slice(0,10))
        // let specTime:Times;
        // specTime.date=orders[i].order_date.slice(0,10);
        for(let j=1;j<orders.length;j+=1){
          if(orders[i].arrival_date.toString().slice(0,10)===orders[j].arrival_date.toString().slice(0,10)){
            counter+=1;
          }
        }
        if(counter>=3){
          temp.push(new Date(orders[i].arrival_date.toString().slice(0,10)))
        }
        counter=0;
      }

      return temp;
    }

  public async ngOnInit() {
    this.cities = await this.loginService.getCities(this.myCountry);
    this.allOrders=await this.orderService.getAllOrders();
    this.items = await this.itemService.itemsByCart(clientStore.getState().cart._id);
    this.sum=this.items.map(t => t.total_price).reduce((acc, value) => acc + value, 0);
    this.myCart=clientStore.getState().cart;
    this.blockedDates=this.checkDates(this.allOrders);
    console.log(this.blockedDates)
  }

  dateFilter = (d: Date) => {
    // Loop through the disabled dates array and compare each date with d
    for (let date of this.blockedDates) {
      // If d matches any date in the array, return false
      if (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      ) {
        return false;
      }
    }

     // Otherwise return true
     return true;
  };


  public async openDialog(){
    this.isActive=true;
    const dialogRef = this.dialog.open(OrderCompleteComponent);
    // await this.itemService.deleteAllItems(clientStore.getState().cart._id);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  public filterCities(searchText: any): void {
    console.log(searchText);

    this.filteredCities = this.cities.filter(city => city.toLowerCase().includes(searchText.toLowerCase()));
    console.log(this.filteredCities);

  }

  public fourCC(creditNumber:number){
    let temp=creditNumber.toString();
    temp=temp.slice(temp.length-4,temp.length);
    console.log(temp);
    return Number(temp);
  }
  public async deleteAll() {
    try {
      // if(!window.confirm("Are you sure?")) return;
      await this.itemService.deleteAllItems(this.myCart._id);
      // alert("Items has been deleted");
      this.items = await this.itemService.itemsByCart(this.myCart._id);
    } catch (err) {
      alert(err);
    }
  }
  public async send() {
    if (this.myForm.invalid) {
      // Mark all form controls as touched to trigger the display of validation errors
      Object.values(this.myForm.controls).forEach(control => {
        control.markAsTouched();
      });
      // Prevent the form from submitting
      return;
    }

  // If the form is valid, proceed with sending the data to the backend
  const formData = this.myForm.value;
  console.log(clientStore.getState().client._id,clientStore.getState().cart._id,this.sum,formData.city,formData.street,formData.arrival_date,new Date().toISOString(),formData.last_fourCC)
  this.newOrder = new OrderModel();
  this.newOrder.clientId = clientStore.getState().client ;
  this.newOrder.cartId = this.myCart ;
  this.newOrder.sum = this.sum;
  this.newOrder.city = formData.city;
  this.newOrder.street = formData.street;
  this.newOrder.arrival_date = formData.arrival_date;
  this.newOrder.order_date = new Date().toISOString();
  this.newOrder.last_fourCC = this.fourCC(formData.last_fourCC);
  console.log(this.newOrder);
      try{
        await this.orderService.addOrder(this.newOrder);
        this.deleteAll();
        console.log("order made successfully");
      }catch(err){
        console.log(err);
      }

  }
}
