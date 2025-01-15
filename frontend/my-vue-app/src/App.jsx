import React from "react";  
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";  
import Home from "./pages/Home";  
import AddTransaction from "./pages/AddTransaction";  

const App = () => {  
  return (  
    <Router>  
      <div>  
        <nav>  
          <Link to="/home">  
            <button>Home</button>
          </Link>  
          <Link to="/add-transaction">  
            <button>Add Transaction</button>  
          </Link>  
        </nav>  

        <Routes>  
          <Route path="/home" element={<Home />} />  
          <Route path="/add-transaction" element={<AddTransaction />} />  
        </Routes>  
      </div>  
    </Router>  
  );  
};  

export default App;