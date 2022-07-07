import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "./cart/Header";
import ShoppingList from "./cart/ShoppingList";
import Footer from "./cart/Footer";
import CartComponent from "./cart/CartComponent";
import "react-toastify/dist/ReactToastify.css";
import { Drawer } from "@material-ui/core";

class App extends Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      myCartList: [],
    };
  }

  componentDidMount() {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          productList: data,
        });
      });
  }
  addToCart = (item) => {
    let find = false;
    if (this.state.myCartList.length > 0) {
      let updateItems = this.state.myCartList.map((existingItem) => {
        if (item.id === existingItem.id) {
          find = true;
          existingItem.count++;
        }
        return existingItem;
      });
      if (find) {
        this.setState({
          myCartList: updateItems,
        });
      } else {
        this.setState({
          myCartList: [...this.state.myCartList, item],
        });
      }
    } else {
      this.setState({
        myCartList: [...this.state.myCartList, item],
      });
    }
  };
  modifyItem = (id, operation) => {
    console.log(id);
    let modifiedCart = this.state.myCartList.map((item) => {
      if (item.id === id && operation === "add") {
        item.count = item.count + 1;
      } else if (item.id === id && operation === "substract") {
        item.count = item.count - 1;
      }
      return item;
    });
    this.setState({
      myCartList: modifiedCart,
    });
  };

  removeItem = (id) => {
    let modifiedCart = this.state.myCartList.filter((item) => item.id !== id);
    this.setState({
      myCartList: modifiedCart,
    });
    toast.info("item removed from cart !!", { autoClose: 2000 });
  };
  sortItems = (criteria) => {
    if (criteria !== "d") {
      let sortedItems = this.state.productList.sort((a, b) => {
        let price1 = a.price;
        let price2 = b.price;
        let comparison = 0;
        if (price1 > price2) {
          comparison = 1;
        } else if (price1 < price2) {
          comparison = -1;
        }
        if (criteria === "lh") {
          return comparison;
        } else {
          return comparison * -1;
        }
      });
      toast.success("sorted items on Price !!", { autoClose: 4000 });
      console.log("sortedItems: ", sortedItems);
      this.setState({
        productList: sortedItems,
      });
    } else {
      let sortedItems = this.state.productList.sort((a, b) => {
        let d1 = a.discount;
        let d2 = b.discount;
        let comparison1 = 0;

        if (d1 > d2) {
          comparison1 = 1;
        } else if (d1 < d2) {
          comparison1 = -1;
        }
        return comparison1 * -1;
      });

      toast.success("sorted items on Discount !!", { autoClose: 4000 });
      console.log("sortedItems1: ", sortedItems);
      this.setState({
        productList: sortedItems,
      });
    }
  };
  render() {
    console.log(this.state.productList);
    let { myCartList } = this.state;
    return (
      <div>
        <Header myCartList={this.state.myCartList} />
        <ToastContainer />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ShoppingList
                productList={this.state.productList}
                addToCart={this.addToCart}
                sortItems={this.sortItems}
              />
            }
          />
          <Route
            exact
            path="/my-cart"
            element={
              <CartComponent
                myCartList={myCartList}
                modifyItem={this.modifyItem}
                removeItem={this.removeItem}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}
export default App;
