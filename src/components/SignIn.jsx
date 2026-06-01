import React, { useState } from 'react'
import './signin.css'
import logo from "../assets/logo.jpg"
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [createAcc, setCreateAcc] = useState(true);
  const [signin, setSignin] = useState(false);
  const [style, setStyle] = useState();
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({ email: '', phone: '', password: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });

  const handleClick = () => {
    setCreateAcc(!createAcc);
    setSignin(!signin);
    setStyle('animation');
  }

  function saveUsersToStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function getUsersFromStorage() {
    try {
      const raw = localStorage.getItem('users');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const { email, phone, password } = signUpData;
    if (!email || !password) {
      alert('Please provide email and password');
      return;
    }
    const users = getUsersFromStorage();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert('Account with this email already exists');
      return;
    }
    const newUser = { email, phone, password };
    users.push(newUser);
    saveUsersToStorage(users);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    alert('Sign up successful');
    navigate('/');
  }

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const { email, password } = signInData;
    if (!email || !password) {
      alert('Please provide email and password');
      return;
    }
    const users = getUsersFromStorage();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      alert('Invalid credentials');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Login successful');
    navigate('/');
  }

  return (
    <>
      <div className={style}>
        {signin && (
          <div className='Signin'>
            <div className="container">
              <h1 className="logo1"><img src={logo} alt="food" /></h1>
              <div className="login">
                <h1>Login Page</h1>
              </div>
              <form className="uname" onSubmit={handleSignInSubmit}>
                <label htmlFor="signin-email">Email:</label>
                <input
                  id="signin-email"
                  type="email"
                  placeholder="User Name or Email"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  required
                />
                <div className="pas">
                  <label htmlFor="signin-pass">Password: </label>
                  <input
                    id="signin-pass"
                    type="password"
                    placeholder="Enter the Password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    className="in"
                    required
                  />
                </div>
                <div className="bt">
                  <button className='log' type="submit">Login</button>
                </div>
              </form>
              <div className="not register">
                <p>Not Registered? <button className='createAcc' onClick={handleClick}>Create Account</button></p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={style}>
        {createAcc && (
          <div className='Signin'>
            <div className="container">
              <h1 className="logo1"><img src={logo} alt="food" /></h1>
              <div className="login">
                <h1>Create Account</h1>
              </div>
              <form className="uname" onSubmit={handleSignUpSubmit}>
                <label htmlFor="signup-email">Email:</label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="User Name or Email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  required
                />
                <div className="pas">
                  <label htmlFor="signup-phone">Mobile Number:</label>
                  <input
                    id="signup-phone"
                    type="text"
                    placeholder="Enter the Number"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                    className="in"
                  />
                </div>
                <div className="pas">
                  <label htmlFor="signup-pass">Password:</label>
                  <input
                    id="signup-pass"
                    type="password"
                    placeholder="Enter the Password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    className="in"
                    required
                  />
                </div>
                <div className="bt">
                  <button className='log' type="submit">Sign Up</button>
                </div>
              </form>
              <div className="not register">
                <p>Registered? <button className='createAcc' onClick={handleClick}>Sign In</button></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SignIn