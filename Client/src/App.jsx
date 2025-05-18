import { Route,Routes } from "react-router-dom"
import Home from "./Components/Home"
import UploadData from "./Components/UploadData"
import NavBar from "./Components/NavBar"
import Customers from "./Components/Customers"

function App() {

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen flex flex-col">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customers" element={<Customers/>}/>
        <Route path="/upload" element={<UploadData/>}/>
      </Routes>
    </div>
  )
}

export default App
