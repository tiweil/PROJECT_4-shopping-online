
import {createStore} from 'redux';
import { ItemModel } from '../models/item.model';

//npm i redux
//1. state
export class ItemState {
    public items: ItemModel[] = [];
}

//2. Action Type
export enum ItemActionType {
    AllItems = "AllItems",
    AddItem = "AddItem",
    DeleteItem = "DeleteProduct",
    FindItem = "FindItem",
    DeleteAll = "DeleteAll",
    UpdateItem = "UpdateItem"
}

//3. Action
export interface ItemAction {
    type: ItemActionType;
    payload: any;
}

//4. redux
//מקבלת אוביקט וסוג פעולה ומחזירה סטייט חדש
export function itemsReducer(currentState = new ItemState(), action:ItemAction): ItemState {
    const newState = {...currentState};
    
    switch(action.type) {

        case ItemActionType.AllItems://the payload here is the arry list of product
        newState.items = action.payload;
        console.log(action.payload);
        break;
    
        case ItemActionType.AddItem: //the paylod here is a new product
            newState.items.push(action.payload);
        break;

        case ItemActionType.DeleteItem: //the payload here is the product id to delete
            const indexToDelete = newState.items.findIndex(i => i._id === action.payload)
            if(indexToDelete >=0) {
                newState.items.splice(indexToDelete, 1);
            }
            break;

            case ItemActionType.UpdateItem:
            case ItemActionType.FindItem://the payload here is the single product by id
            newState.items.filter(i => i !== action.payload);
            newState.items[0] = action.payload;
            console.log(newState.items);
            break;

            case ItemActionType.DeleteAll:
            newState.items= [];
            console.log(newState.items);
            break;



   }
    return newState;
}

//5. store
export const itemStore = createStore(itemsReducer);
