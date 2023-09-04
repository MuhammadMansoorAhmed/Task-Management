import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.jsx'
import { CookiesProvider } from "react-cookie";
import CookieProvider from './components/Pages/Context';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <CookieProvider>
        <App />
      </CookieProvider>
    </CookiesProvider>
  </React.StrictMode>,
)
