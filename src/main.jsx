import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import WorkCountdown from './WorkCountdown'
import Wizz from './Wizz'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Wizz/>
    </BrowserRouter>
  </React.StrictMode>
)