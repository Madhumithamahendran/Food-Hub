import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./AddCart.css"
const AddCart = ({cart,setCart}) => {
  const [total,setTotal]=useState(0);
  useEffect(()=>{
    setTotal(cart.reduce((acc,curr)=>acc + parseInt(curr.price)*curr.item,0));
  },[cart]);

  const handleQuantityChange = (id, action) => {
    setCart((prevCart) => {
      if (action === 'decrease') {
        const target = prevCart.find((it) => it.id === id);
        // if quantity is 1, remove the item from cart
        if (target && target.item === 1) {
          return prevCart.filter((it) => it.id !== id);
        }
        return prevCart.map((it) => (it.id === id ? { ...it, item: it.item - 1 } : it));
      }
      // increase
      return prevCart.map((it) => (it.id === id ? { ...it, item: it.item + 1 } : it));
    });
  };
  return (
    <>
    <h1 className='heading'>Cart Products</h1>
    <div className='cart-container'>
      {
        cart.map((res)=>(
          <div key={res.id} className="cart-product">
            <div className="pro">
            <div className="img">
          <img src={res.image} alt="img" />
        </div>
        <div className="cart-product-details">
          <h3>{res.food}</h3>
          <p>Price Rs: {res.price}</p>
        </div>
        
        </div>
        <div className='quantity'>
          <h4>Quantity</h4>
          <button onClick={() => handleQuantityChange(res.id, 'decrease')}>-</button>
          <span>{res.item}</span>
          <button onClick={() => handleQuantityChange(res.id, 'increase')}>+</button>
        </div>
        
      </div>
        ))
      }
 
    </div>
    <h2 className='amount'>Total Amount Rs: {total}</h2>
    <div className="checkout-row">
      <Link to="/payment" state={{ from: 'cart' }} className="checkout-btn">Proceed to Checkout</Link>
    </div>
    </>
    
  )
}

export default AddCart