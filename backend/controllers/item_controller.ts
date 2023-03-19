import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ItemModel from "../models/itemModel";

//get all items by cart
const getItemsByCart = async (request: Request, response: Response, next: NextFunction) => {
    const cart_id = request.params.cart; 
    return ItemModel.find({"cartId" :cart_id})
    .populate(['productId','cartId'])
    .then((items) => {
        items ? response.status(200).json(items):response.status(200).json({message:"not found"})
    })
    .catch((err)=> next(err));
}
//add item
const addItem= async (request: Request, response: Response, next: NextFunction) => {
    const item =request.body;
    const newItem = new ItemModel({
        _id:new mongoose.Types.ObjectId(),
        ...item,
    });
    return newItem
    .save()
    .then((item)=> response.status(201).json(item))
    .catch((err)=> next(err));
}


// update item
const updateItem=async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    return ItemModel.findById(id)
    .then((item)=>{
    if(item){
        item.set(request.body);
        return item
        .save()
        .then((item)=> response.status(201).json(item))
        .catch((err)=> next(err));
    }else{
        response.status(404).json({message: "not found"})
    }
})
    .catch((err)=> next(err));
}

// delete item 
const deleteItem= async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    return ItemModel.findByIdAndDelete(id)
    .then((item)=>
    (item?response.status(201).json({message:"deleted"}):response.status(404).json({message:`${item} not found`})))
    .catch((err)=> next(err));
}

// delete all items 
const deleteAllItems = async (request: Request, response: Response, next: NextFunction) => {
    const cart_id = request.params.cart; 
    return ItemModel.deleteMany({"cartId" :cart_id})
    .then((item)=>
    (item?response.status(201).json({message:"deleted all"}):response.status(404).json({message:"err"})))
    .catch((err)=> next(err));
}

export default{
    getItemsByCart,
    addItem, 
    updateItem,
    deleteItem,
    deleteAllItems
}