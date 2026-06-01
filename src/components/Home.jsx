import React from 'react'
import Foodi from "./Foodi";

import "./home.css"
import Restaurant from './Restaurant';
import { FaInstagramSquare, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';
const Home = () => {
  
  return (
    
      <div className='homee'>
      <h1 className='res'>What's on your mind?</h1>
      <div className="foodi">
        <Foodi/>
      </div>
      <h1 className='res'>Restaurants</h1>
      <Restaurant/>
      <div className="bor"><span></span></div>
      <footer>
        <div className='footerContent'>
          <div> <h1 style={{color:"orangered", fontWeight:1000, fontFamily:"Sour Gummy"}}>FOOD HUB</h1>
          <p style={{color:"#333"}}>&copy;{new Date().getFullYear()} FOOD HUB Limited</p>
        </div>
        <div className="cont">
          <div className="contactSection">
          <h3>Contact us</h3>
        <ul  className="contact" style={{color:"#333"}}>
          <li>Help & Support</li>
          <li>Partner with us</li>
          <li>Ride with us</li>
        </ul>
          </div>
          <div className="available">
            <h3>Available Cities</h3>
            <ul className="avai">
              <li>Chennai</li>
              <li>Bangalore</li>
              <li>Delhi</li>
              <li>Pune</li>
              <li>Mumbai</li>
              <li>Hyderabad</li>
            </ul>
          </div>
          <div className="social">
            <h3>Social Links</h3>
            <ul className="Soci">
              <li><FaInstagramSquare/></li>
              <li><FaFacebook/></li>
              <li><FaLinkedin/></li>
              <li><FaTwitter/></li>
              <li><FaPinterest/></li>
              
            </ul>
          </div>
        </div>
        
         </div>
      </footer>
    </div>
    
   
    
  )
}

export default Home