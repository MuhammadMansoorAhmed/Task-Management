import axios from 'axios';
import './Login.css'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const userFocus = useRef();
  const error = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userFocus.current.focus();
  }, []);


  const handleSignUp = async (e) => {
    e.preventDefault()
    const validEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    if(name.length === 0) return setErrorMsg("Invalid Name");
    if (!validEmail || !validPassword ) return setErrorMsg("Invalid Email or Password");

    try{
      await axios.post("http://localhost:3500/register",{
        name,
        email,
        password
      });
      setName("");
      setEmail("");
      setPassword("");
      navigate('/')
    }catch(error){
      setErrorMsg("Failed to login")
    }

  }
  return (
    <form action='/register' className="LoginContainer" onSubmit={handleSignUp}>
      <div className="loginDisplay">
        <h1 className="heading">Task Management App</h1><br />
        <p className="desc">description</p>
      </div>
      <div className="LoginForm">
        <p className="errPara"
          ref={error}
          aria-live="assertive">
          {errorMsg}
        </p>
        <div className="loginField">
          <label htmlFor="Name" className="label">Name</label>
          <input className="input"
            type="Name"
            name="Name"
            id="Name"
            value={name}
            ref={userFocus}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name" />
        </div>
        <div className="loginField">
          <label htmlFor="Email" className="label">Email</label>
          <input className="input"
            type="email"
            name="Email"
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email" />
        </div>
        <div className="loginField">
          <label htmlFor="Password" className="label">Password</label>
          <input className="input"
            type="password"
            name="Password"
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password" />
        </div>
        <button className="LoginButon" type='submit'>Sign up</button>
      </div>

    </form>
  )
}

export default SignUp
