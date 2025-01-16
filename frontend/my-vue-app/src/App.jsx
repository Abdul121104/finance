import React from "react";  
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";  
import Home from "./pages/Home";  
import AddTransaction from "./pages/AddTransaction";
import Advise from "./pages/Advise";

const App = () => {  
  return (  
    <Router>
      <div>
        <nav>
          <Link to="/home"><button>Home</button></Link>
          <Link to="/add-transaction"><button>Add Transaction</button></Link>
          <Link to="/advise"><button>Financial Advisor</button></Link>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/advise" element={<Advise />} />
        </Routes>
      </div>
    </Router>
  );  
};  

export default App;