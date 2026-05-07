import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
// import BusinessDetails from "./pages/BusinessDetails";
import Navbar from "./component/Navbar";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Subscription from "./pages/subscription.jsx";
import CreateBusiness from "./pages/CreateBusiness.jsx";


function App() {
 

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/subscription" element={<Subscription/>}/>
      <Route path="/search" element={<SearchResults/>}/>
      {/* <Route path="/huliyar/:slug" element={<BusinessDetails/>}/> */}
      <Route path="/create-business" element={<CreateBusiness/>}/>
      

    </Routes>
      
    </BrowserRouter>
  )
}

export default App
