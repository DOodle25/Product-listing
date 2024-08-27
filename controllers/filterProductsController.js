const { Product } = require('../models/models');

exports.filterProducts = async (req,res)=>{

  const {
    selectedCategory,
    selectedCompany,
    selectedRating,
    minPrice,
    maxPrice,
    selectedAvailability,
    sortBy,
    isSortAscending,
    searchTerm,
  } = req.query;
  const query = {};

  if (selectedCategory!=='All' && selectedCategory!==undefined) {
    query.category = selectedCategory;
  }

  if (selectedCompany!=='All' && selectedCompany!==undefined) {
    query.company = selectedCompany;
  }

  if (selectedRating) {
    query.rating = { $gte: selectedRating };
  }

  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }


  if (selectedAvailability) {
    query.availability = selectedAvailability;
  }

  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  const sortOrder = isSortAscending==='true' ? 1 : -1;
  let sortObject = {};

  if (sortBy) {
    sortObject[sortBy.toLowerCase()] = sortOrder;
  }

  try {
    const products = await Product.find(query).sort(sortObject);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

}

