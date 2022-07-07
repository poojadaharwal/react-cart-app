import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterComponent from "./FilterComponent";
import "../styles/ShoppingList.scss";
import SortComponent from "./SortComponent";
import { Box } from "@material-ui/core";

function ShoppingList(props) {
  const handleAddtoCart = (item, e) => {
    item.count = 1;
    toast.success("Added to cart !!", { autoClose: 2000 });
    props.addToCart(item);
  };
  const sortItems = (criteria, e) => {
    props.sortItems(criteria);
  };

  const { productList } = props;

  return (
    <div className="shopping-container">
      <FilterComponent />
      <Box component="main" className="right-container">
        <SortComponent sortItems={sortItems} />
        <div className="itemsContainer">
          {productList.map((item) => {
            let { title, price, image } = item;
            return (
              <div className="itemBox">
                <div className="item-content">
                  <img src={image} alt="item-image" width="200" height="200" />
                  <p className="title">{title}</p>
                  <p>
                    <b> {price} </b>
                    <FontAwesomeIcon icon={faEuroSign} />
                  </p>
                  <p style={{ textAlign: "center" }}>
                    <button
                      id="addToCart"
                      onClick={(e) => handleAddtoCart(item, e)}
                    >
                      Add to Cart
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}
export default ShoppingList;
