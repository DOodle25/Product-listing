const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const categoriesSchema = new Schema({
    name:String
});

const companiesSchema = new Schema({
    name:String,
    description:String
});

const productsSchema = new Schema({
    availability:String,
    category:String,
    company:String,
    discount:Number,
    price:Number,
    productName:String,
    rating:Number
});


const Product = mongoose.model('product',productsSchema);
const Company = mongoose.model('company',companiesSchema);
const Category = mongoose.model('category',categoriesSchema);

module.exports ={
    Product,
    Company,
    Category
}