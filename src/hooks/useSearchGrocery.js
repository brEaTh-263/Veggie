import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

export default (title, subCategory, category) => {
  let products = [];
  if (title.length === 0) {
    // FOR SEARCHGROCERIES SCREEN WHERE ALL PRODUCTS MUST EXISTS
    products = useSelector((state) => state.Products.products);
  } else {
    products = useSelector((state) =>
      state.Products.products.filter((prod) => {
        if (subCategory) {
          if (category === "All" && prod.Category === title) {
            return true;
          } else {
            return prod.subCategory === category;
          }
        } else {
          if (category === "All") {
            return true;
          }
          return prod.Category === category;
        }
      })
    );
  }

  const [items, setItems] = useState([]);

  const getSearchedGrocery = useCallback(async (query) => {
    let text = query.replace(/\W/g, ""); //searching only for all alphanumeric characters only
    const searched = products.filter((product) => {
      let name = product.name.toLowerCase();
      let priceKg = product.priceKg.toString();
      let priceQty = product.priceQty.toString();
      let category = product.Category.toLowerCase();
      let indianName;
      if (product.indianName) {
        //FOR DEVELOPMENT MODE ONLY,IN PRODUCTION INDIAN NAME FOR PRODUCT MUST EXIST
        indianName = product.indianName.toLowerCase();
      } else {
        indianName = product.name.toLowerCase();
      }
      if (
        name.includes(text.toLowerCase()) ||
        priceKg.includes(text) ||
        priceQty.includes(text) ||
        category.includes(text.toLowerCase()) ||
        indianName.includes(text.toLowerCase())
      ) {
        return true;
      } else false;
    });
    setItems(searched);
  }, []);

  return [getSearchedGrocery, items, setItems];
};
