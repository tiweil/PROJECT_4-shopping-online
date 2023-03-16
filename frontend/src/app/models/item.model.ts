import { CartModel } from "./cart.model";
import { ProductModel } from "./product.model";

export class ItemModel {
    _id?:string;
    productId: ProductModel;
    qty:number;
    total_price:number;
    cartId:CartModel;
}
