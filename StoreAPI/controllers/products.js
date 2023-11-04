const getAllProductsStatic = async(req,res) => {
  // throw Error('testing async errors')
  res.status(200).json({message: " testing"})
}
const getAllProducts = async(req,res) => {
  res.status(200).json({message: "All Products"})
}
module.exports = {
  getAllProducts,
  getAllProductsStatic
}