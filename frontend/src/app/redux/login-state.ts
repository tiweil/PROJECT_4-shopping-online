import { createStore } from "redux";
import { CartModel } from "../models/cart.model";
import { ClientModel } from "../models/client.model";

// 1. Global State
export class AuthState {
    public client: ClientModel = null;
    public cart: CartModel = null;
}

// 2. Action Type
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
    myCart = "myCart"
}

// 3. Action
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// 4. Reducer
export function clientReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {

        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.client = action.payload;
            console.log( newState.client._id);
            localStorage.setItem("email", JSON.stringify(newState.client));
            break;

        case AuthActionType.Logout:
            newState.client = null;
            localStorage.removeItem("email");
            localStorage.removeItem("cart");
            break;

        case AuthActionType.myCart:
            newState.cart = action.payload[0];
            localStorage.setItem("cart", newState.cart._id);
            console.log(newState.cart)
            break;
    }

    return newState;
}

// 5. Store
export const clientStore = createStore(clientReducer);
