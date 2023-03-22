import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { appConfig } from 'src/utils/app-config';
import { ItemModel } from '../models/item.model';
import { CartModel } from '../models/cart.model';
import { ItemActionType, itemStore } from '../redux/item-state';
import { clientStore } from '../redux/login-state';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

constructor(private http: HttpClient) { }

public async AddItemToCart(item:ItemModel): Promise<any> {
    const checkCart = clientStore.getState().cart;
    if(checkCart){
    const observable = this.http.post<ItemModel>(appConfig.addItemUrl, item);
    const addItem = await firstValueFrom(observable);
    itemStore.dispatch({ type: ItemActionType.AddItem, payload: addItem })
    console.log(addItem)
    return addItem;
    }
    else{
      alert("you have to login, before start shopping")
    }
}

public async itemsByCart(cartId: string): Promise<ItemModel[]> {
  let items = itemStore.getState().items;
  if(items.length === 0){
      // get the observable
    const observable = this.http.get<ItemModel[]>(appConfig.itemsByCart + cartId);
      //convert to promise
    items = await firstValueFrom(observable);
    itemStore.dispatch({ type: ItemActionType.AllItems, payload:items  })
  }
  return items;
  }

  //delete item
  public async deleteItem(id: string): Promise<void> {
    console.log("id:"+id);
    const observable = this.http.delete<ItemModel>(appConfig.deleteItemUrl + id);
    await firstValueFrom(observable);
    itemStore.dispatch({ type: ItemActionType.DeleteItem, payload:id  })
    }

  //get all carts
  public async getAllCarts(): Promise<CartModel[]> {
    // get the observable
    const observable = this.http.get<CartModel[]>(appConfig.getAllCart);
    //convert to promise
    const carts = await firstValueFrom(observable);
  return carts;
  }

    //delete all items
    public async deleteAllItems(cart_id: string): Promise<void> {
      console.log("id:"+cart_id);
      const observable = this.http.delete<ItemModel>(appConfig.deleteAllItems + cart_id);
      await firstValueFrom(observable);
      itemStore.dispatch({ type: ItemActionType.DeleteAll, payload:cart_id  })
      }

    //update item
    public async updateItem(item: ItemModel): Promise<void> {
      console.log(item);
      const updateItem:ItemModel={
        productId: item.productId,
        qty:item.qty,
        total_price:item.total_price,
        cartId:item.cartId
      }
      const observable = this.http.patch<ItemModel>(appConfig.updateItemUrl + item._id, updateItem);
      await firstValueFrom(observable);
      itemStore.dispatch({ type: ItemActionType.UpdateItem, payload: item })

    }

}
