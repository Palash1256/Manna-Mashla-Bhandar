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
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customers" element={<Customers/>}/>
        <Route path="/upload" element={<UploadData/>}/>
      </Routes>
  </BrowserRouter>
</StrictMode>
)
