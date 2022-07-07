import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShoppingCart,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";


const Header = (props) =>  {
  const {myCartList} = props;
    return (
      <header className="header">
        <h2>E-commerce App</h2>

        <p className="rightIcons">

          <Link to="/my-cart">
            <p className="cart-icon">
              <FontAwesomeIcon
                icon={faShoppingCart}
                size="lg"
                className="highlight"
              />
              {myCartList.length > 0 && (
                 <p className="cart-notify"> {myCartList.length}</p>
              )}
            </p>
          </Link>
        </p>
      </header>
    );
}

export default Header;
