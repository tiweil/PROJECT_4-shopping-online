import { CategoryModel, ICategoryModel } from "../models/categoryModel";
import { ResourceNotFoundError } from "../models/client-errors";
import { IProductModel, ProductModel } from "../models/productModel"

//Get all category
function getAllcategory(): Promise<ICategoryModel[]>{
    //find describing the action needed, exec returning promise 
    return CategoryModel.find().exec();
    }

//deleteCategory
async function deleteCategory(_id: string): Promise<void>{
    const deleteProduct = await CategoryModel.findByIdAndDelete(_id).exec();
    if(!deleteProduct) throw new ResourceNotFoundError(_id);
    }

//Get all products
function getAllProducts(): Promise<IProductModel[]>{
//find describing the action needed, exec returning promise 
return ProductModel.find().exec();
}

//Get one product
async function getOneProduct(_id: string): Promise<IProductModel>{
    const product = await ProductModel.findById(_id).exec();
    if(!product) throw new ResourceNotFoundError(_id);
    return product;
    }

//Add new product
function addProduct(product: IProductModel): Promise<IProductModel>{
    return product.save();
    }

//Update product
async function updateProduct(product: IProductModel): Promise<IProductModel>{
    const updateProduct = await ProductModel.findByIdAndUpdate(product._id, product, 
        //returnOriginal= will return database object and not argument object
        {returnOriginal: false }).exec();
        //if not fount
        if(!updateProduct) throw new ResourceNotFoundError(product._id);
    return updateProduct;
    }

    export default {
        getAllcategory,
        getAllProducts,
        getOneProduct,
        addProduct,
        updateProduct,
        deleteCategory,
    }