import React, { useEffect, useMemo, useState } from 'react'
import './Payment.css'
import { FaCreditCard, FaMoneyBillWave, FaWallet, FaQrcode, FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// Payment page: frontend-only demo with animated card and fake processing
const Payment = ({ cart, setCart }) => {
  const navigate = useNavigate()
  const [method, setMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [dark, setDark] = useState(false)

  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', pincode: '' })

  // card state
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '', save: false })
  const [upiId, setUpiId] = useState('')

  const total = useMemo(() => cart.reduce((s, it) => s + Number(it.price) * it.item, 0), [cart])

  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(id)
    }
  }, [toast])

  const validateCard = () => {
    const num = card.number.replace(/\s+/g, '')
    const validNum = /^\d{16}$/.test(num)
    const validCvv = /^\d{3,4}$/.test(card.cvv)
    const validExpiry = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(card.expiry)
    return validNum && validCvv && validExpiry
  }

  const validateUpi = () => {
    return /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upiId)
  }

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'FOOD10') {
      setCouponApplied(true)
      setToast({ type: 'success', text: 'Coupon applied: 10% off' })
    } else {
      setToast({ type: 'error', text: 'Invalid coupon' })
    }
  }

  const processPayment = () => {
    // basic validation per method
    if (!address.line1 || !address.phone) {
      setToast({ type: 'error', text: 'Please fill delivery address' })
      return
    }
    if (method === 'card' && !validateCard()) {
      setToast({ type: 'error', text: 'Card details invalid' })
      return
    }
    if (method === 'upi' && !validateUpi()) {
      setToast({ type: 'error', text: 'UPI ID invalid' })
      return
    }

    setLoading(true)
    setToast({ type: 'info', text: 'Processing payment...' })

    setTimeout(() => {
      setLoading(false)
      // simulate success
      const orderId = 'FH' + Math.random().toString(36).slice(2, 10).toUpperCase()
      // optionally clear cart for demo
      setCart([])
      navigate('/success', { state: { orderId, eta: 25 } })
    }, 2200)
  }

  const progress = ['Cart', 'Address', 'Payment', 'Success']

  return (
    <div className={dark ? 'pay-wrap dark' : 'pay-wrap'}>
      <div className="particles" aria-hidden />
      <div className="pay-card">
        <div className="pay-header">
          <button className="back" onClick={() => window.history.back()}><FaChevronLeft/></button>
          <h2>Checkout</h2>
          <div className='dark-toggle'>
            <label className="switch">
              <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
              <span className="slider" />
            </label>
          </div>
        </div>

        <div className="progress">
          {progress.map((p, i) => (
            <div key={p} className={`step ${i <= 2 ? 'active' : ''}`}>
              <div className="num">{i+1}</div>
              <div className="label">{p}</div>
            </div>
          ))}
        </div>

        <div className="pay-body">
          <section className="left">
            <h3>Delivery Address</h3>
            <div className="address-form">
              <input placeholder="Full name" value={address.name} onChange={e=>setAddress({...address,name:e.target.value})} />
              <input placeholder="Phone" value={address.phone} onChange={e=>setAddress({...address,phone:e.target.value})} />
              <input placeholder="Address line 1" value={address.line1} onChange={e=>setAddress({...address,line1:e.target.value})} />
              <input placeholder="City" value={address.city} onChange={e=>setAddress({...address,city:e.target.value})} />
              <input placeholder="Pincode" value={address.pincode} onChange={e=>setAddress({...address,pincode:e.target.value})} />
            </div>

            <h3>Payment Method</h3>
            <div className="methods">
              <label className={`method ${method==='card'?'sel':''}`} onClick={() => setMethod('card')}><FaCreditCard/> Card</label>
              <label className={`method ${method==='upi'?'sel':''}`} onClick={() => setMethod('upi')}><FaQrcode/> UPI</label>
              <label className={`method ${method==='cod'?'sel':''}`} onClick={() => setMethod('cod')}><FaMoneyBillWave/> Cash</label>
              <label className={`method ${method==='wallet'?'sel':''}`} onClick={() => setMethod('wallet')}><FaWallet/> Wallet</label>
            </div>

            <div className="method-form">
              {method === 'card' && (
                <div className='card-form'>
                  <div className="animated-card">
                    <div className="chip" />
                    <div className="card-number">{card.number || 'XXXX XXXX XXXX XXXX'}</div>
                    <div className="card-bottom">
                      <div>{card.name || 'CARDHOLDER'}</div>
                      <div>{card.expiry || 'MM/YY'}</div>
                    </div>
                  </div>

                  <input placeholder="Card number" value={card.number} onChange={e=>setCard({...card,number:e.target.value.replace(/[^0-9\s]/g,'')})} />
                  <input placeholder="Name on card" value={card.name} onChange={e=>setCard({...card,name:e.target.value})} />
                  <div className='row'>
                    <input placeholder="MM/YY" value={card.expiry} onChange={e=>setCard({...card,expiry:e.target.value})} />
                    <input placeholder="CVV" value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value.replace(/[^0-9]/g,'')})} />
                  </div>
                  <label className='save'>
                    <input type='checkbox' checked={card.save} onChange={e=>setCard({...card,save:e.target.checked})} /> Save card for faster checkout
                  </label>
                </div>
              )}

              {method === 'upi' && (
                <div className='upi-form'>
                  <input placeholder='example@bank' value={upiId} onChange={e=>setUpiId(e.target.value)} />
                </div>
              )}

              {method === 'cod' && <div className='cod-note'>Pay with cash when the delivery arrives.</div>}
              {method === 'wallet' && <div className='wallet-note'>Choose from simulated wallets. (Demo)</div>}
            </div>

            <div className='coupon-row'>
              <input placeholder='Coupon code' value={coupon} onChange={e=>setCoupon(e.target.value)} />
              <button onClick={applyCoupon} className='apply-btn'>Apply</button>
            </div>

          </section>

          <aside className="right">
            <div className='summary'>
              <h3>Order Summary</h3>
              <div className='items'>
                {cart.length===0 && <div className='empty'>Cart is empty</div>}
                {cart.map(i=> (
                  <div className='item' key={i.id}>
                    <img src={i.image} alt='' />
                    <div className='meta'>
                      <div className='name'>{i.food}</div>
                      <div className='qty'>Qty: {i.item}</div>
                    </div>
                    <div className='price'>Rs {Number(i.price)*i.item}</div>
                  </div>
                ))}
              </div>

              <div className='totals'>
                <div><span>Subtotal</span><span>Rs {total}</span></div>
                {couponApplied && <div><span>Coupon</span><span>-10%</span></div>}
                <div className='grand'><span>Total</span><span>Rs {couponApplied?Math.round(total*0.9):total}</span></div>
              </div>

              <button className='pay-btn' onClick={processPayment} disabled={loading}>
                {loading ? <span className='loader'/> : 'Pay Now'}
              </button>
              <button className='cancel' onClick={()=>navigate(-1)}>Cancel</button>
            </div>
          </aside>
        </div>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}
    </div>
  )
}

export default Payment
