import React from 'react'

import "./menu.css"
import Product from './Product';

const Menu = ({ foodItems }) => {
  return (
    <div className="menu">
      <div className='restaurant'>
        {foodItems.map((res) => (
          <div key={res.id} className="product1">
            <Product res={res} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu