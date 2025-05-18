import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home.jsx'
import Customers from './Components/Customers.jsx'
import UploadData from './Components/UploadData.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
      <App />
  </BrowserRouter>
</StrictMode>
)
