import { useState, useRef, useEffect } from "react"
import "./Login.css"
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookieContext } from "./Context";


const Login = () => {
  const navigate = useNavigate()
  const userFocus = useRef();
  const error = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookies] = useCookies(["accessToken"]);



  const {userId, setUserId } = useCookieContext();

  useEffect(() => {
    userFocus.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3500/login', {
        email,
        password
      });
  
      setCookies("accessToken", res.data.accessToken);
      setUserId(res.data.userID);
      // console.log(userId);
      navigate('/');
    } catch (error) {
      setErrorMsg("Failed to login")
    }
  }

  return (
    <form action="/login" className="LoginContainer" onSubmit={handleLogin}>
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
          <label htmlFor="Email" className="label">Email</label>
          <input className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="Email"
            id="Email"
            placeholder="Email"
            ref={userFocus}
            value={email}
          />
        </div>
        <div className="loginField">
          <label htmlFor="Password" className="label">Password</label>
          <input className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="Password"
            id="Password"
            placeholder="Password"
            value={password}
            autoComplete="on"
          />
        </div>
        <button className="LoginButon" type="submit">Login</button>
      </div>

    </form>
  )
}

export default Login
