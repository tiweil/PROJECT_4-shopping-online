import { CategoryModel } from "./category.model";

export class ProductModel {
    public _id?: string;
    public name: string;
    public categoryId: CategoryModel;
    public price: number;
    public image: string;
}
