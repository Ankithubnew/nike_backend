const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  productcard__linkoverlay_URL: {
    type: String,
    required: true,
  },
  productcard__messaging: {
    type: String,
  },
  Title1: {
    type: String,
  },
  productcard__productcount: {
    type: String,
  },
  Price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  id:{
    type: Number,
    unique:true,
    require:true,
  }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

// {
//   "Title": "Air Jordan 1 Elevate Low",
//   "Image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e21b73c4-5802-4bf9-b8c5-6943f7a883a0/air-jordan-1-elevate-low-shoes-XlkVrM.png",
//   "productcard__linkoverlay_URL": "https://www.nike.com/in/t/air-jordan-1-elevate-low-shoes-XlkVrM/DH7004-100",
//   "productcard__messaging": "Promo Exclusion",
//   "Title1": "Women's Shoes",
//   "productcard__productcount": "7 Colours",
//   "Price": 11895.00,
//   "quantity": "1",  "id": 50
// }
