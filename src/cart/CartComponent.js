import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/CartComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function CartComponent(props) {
 const handleRemove = (id,e) => {
   props.removeItem(id);
  };
 
  const handlechangeAdd=({id, count}, e)=>{
    if (count < 10) {
      props.modifyItem(id,"add");
    }
  }
  const handlechangeSub=({id,count}, e)=> {
    if(count>1){
        props.modifyItem(id,"substract")
    }
   
  }
    const { myCartList } = props;
    if (myCartList.length === 0) {
      return (
        <div className="mycart">
          <p>
            <Link to="/">return to Home</Link>
          </p>
          <p>No items in your Cart</p>
        </div>
      );
    } else {
      let totalPrice = 0;
      let totalDiscount = 0;
      let totalItems = 0;
      let totalPayable = 0;
      return (
        <div className="mycart">
          <p>
            <Link to="/">return to Home</Link>
          </p>
          <div className="mycart-container">
            <div className="box1">
              {myCartList.length > 0 &&
                myCartList.map(item => {
                  let {title, price, description, image, rating:{rate, count}} = item;
                  
                  totalPrice = (totalPrice +  (price * item.count));
                  console.log('totalPrice: ', totalPrice,price )
                  totalDiscount = (0.02 * totalPrice);
                  totalItems = totalItems + item.count;
                  totalPayable = (totalPrice - totalDiscount)
                  return (
                    <div className="cartBox">
                      <div className="cart-content">
                        <img
                          src={image}
                          alt="item-image"
                          width="150"
                          height="150"
                        />
                        <div className="item-details">
                          <p>{title}</p>
                          <div className="details">
                            <span>
                              {item.price}{" "}
                              <FontAwesomeIcon icon={faEuroSign} />
                            </span>
                            <span>
                              <button onClick={e => handlechangeSub(item,e)} className="count-button">-</button>&nbsp;
                              <span id="count">{item.count}</span>&nbsp;
                              <button onClick={e => handlechangeAdd(item,e)} className="count-button">+</button>
                            </span>
                            <span className="delete-icon">
                              <FontAwesomeIcon icon={faTrashCan} color="red"  onClick={e=>handleRemove(item.id,e)}/>
                             </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="box2">
              <div className="price-container">
                <p>PRICE DETAILS</p>
                <hr />
                <p>
                  Price({totalItems} item):
                  <span className="numerics">
                    {totalPrice.toFixed(2)}
                    <FontAwesomeIcon icon={faEuroSign} />
                  </span>
                </p>
                <p>
                  Discount:
                  <span className="numerics">
                    {totalDiscount.toFixed(2)}
                    <FontAwesomeIcon icon={faEuroSign} />
                  </span>
                </p>
                <hr />
                <p>
                  <b>
                    {" "}
                    Total Payable :
                    <span className="numerics">
                     {totalPayable.toFixed(2)}
                     <FontAwesomeIcon icon={faEuroSign} />
                    </span>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
export default CartComponent;