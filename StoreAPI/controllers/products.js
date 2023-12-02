const Product = require('../models/product');

const getAllProductsStatic = async(req,res) => {
  // throw Error('testing async errors')
  const products = await Product.find({featured: true})

  res.status(200).json({Products: products, nbHits: products.length})
}
const getAllProducts = async(req,res) => {
  // const featured = req.query.featured;

  const { featured,company } = req.query;
  const queryObj = {};
  if(featured){
    queryObj.featured = featured==='true' ? true : false;
  }
  if(company){
    queryObj.company = company;
  }

//if request.query has all wrong keys then essentially queryObj is empty
//and if queryObj is empty we are essentially passing an empty object to MOngoose which will return us all the data values
  console.log(queryObj);
  const products = await Product.find(queryObj)
  res.status(200).json({nbHits: products.length,products: products})
}
module.exports = {
  getAllProducts,
  getAllProductsStatic
}