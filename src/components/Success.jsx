import React from 'react'
import './Success.css'
import { FaCheckCircle } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

const Success = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const orderId = state?.orderId || ('FH' + Math.random().toString(36).slice(2,8).toUpperCase())
  const eta = state?.eta || Math.floor(15 + Math.random()*20)

  return (
    <div className='success-wrap'>
      <div className='success-card'>
        <div className='tick'><FaCheckCircle/></div>
        <h2>Payment Successful</h2>
        <p>Your order <strong>{orderId}</strong> is confirmed.</p>
        <p>Estimated delivery: <strong>{eta} mins</strong></p>
        <button onClick={()=>navigate('/')}>Back to Home</button>
      </div>
    </div>
  )
}

export default Success
