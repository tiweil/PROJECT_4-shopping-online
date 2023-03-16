import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { appConfig } from 'src/utils/app-config';
import { ItemModel } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

constructor(private http: HttpClient) { }

public async AddItemToCart(item:ItemModel): Promise<ItemModel> {

    const observable = this.http.post<ItemModel>(appConfig.addItemUrl, item);

    const addItem = await firstValueFrom(observable);

    return addItem;
}

public async itemsByCart(cartId: string): Promise<ItemModel[]> {
    // get the observable
  const observable = this.http.get<ItemModel[]>(appConfig.itemsByCart + cartId);
    //convert to promise
  const products = await firstValueFrom(observable);

  return products;
  }
  public async deleteItem(id: string): Promise<ItemModel[]> {
    console.log("id:"+id);
    const observable = this.http.delete<ItemModel[]>(appConfig.deleteItemUrl + id);
    const products=await firstValueFrom(observable);
    return products;
    }

}
//delete item

