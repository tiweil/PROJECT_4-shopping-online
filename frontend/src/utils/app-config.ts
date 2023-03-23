class AppConfig {
    //clients
    public loginUrl = "http://localhost:3006/client/login";
    public registerUrl = "http://localhost:3006/client/register";
    //products
    public productsUrl = "http://localhost:3006/product/all";
    public deleteProductUrl = "http://localhost:3006/product/del/";
    public getProductByIdUrl = "http://localhost:3006/product/single/";
    public addProductUrl = "http://localhost:3006/product/add";
    public productsByCategory = "http://localhost:3006/product/category/";

    //category
    public getAllCategoryUrl = "http://localhost:3006/category/all";
    //carts
    public addCartUrl = "http://localhost:3006/cart/add";
    public findCartUrl = "http://localhost:3006/cart/find_cart/";
    public getAllCart="http://localhost:3006/cart/all";
    //items
    public addItemUrl = "http://localhost:3006/items/add";
    public itemsByCart = "http://localhost:3006/items/all/";
    public deleteItemUrl = "http://localhost:3006/items/del/";
    public deleteAllItems = "http://localhost:3006/items/del_all/";
    public updateItemUrl = "http://localhost:3006/items/update/";
    //order
    public AddOrderUrl = "http://localhost:3006/order/add";
    public getAllOrdersUrl="http://localhost:3006/order/all";
}

export const appConfig = new AppConfig();
