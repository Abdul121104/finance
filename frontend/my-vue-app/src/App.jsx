import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddTransaction from './pages/AddTransaction';
import Advise from './pages/Advise';
import ViewTransaction from './pages/ViewTransaction';

const App = () => {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/advise" element={<Advise />} />
          <Route path="/view-transaction" element={<ViewTransaction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
