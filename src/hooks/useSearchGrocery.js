import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default (title) => {
  const products = useSelector((state) =>
    state.Products.products.filter(
      (prod) => prod.Category === title || prod.subCategory === title
    )
  );
  const [items, setItems] = useState([]);

  const getSearchedGrocery = useCallback(async (query) => {
    let text = query.replace(/\W/g, ""); //searching only for all alphanumeric characters only
    const searched = products.filter((product) => {
      let name = product.name.toLowerCase();
      let price = product.price.toString();
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
        price.includes(text) ||
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
