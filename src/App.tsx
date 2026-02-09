import React from 'react';
import Nav from './components/Nav';
import Main from './pages/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import { artProducts } from './data/products';
function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
      <Nav />
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Products artProducts={artProducts} />}/>
        <Route path="/cart" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
