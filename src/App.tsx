import React, {useState} from 'react';
import Nav from './components/Nav';
import Main from './pages/Main';
import Basket from './pages/Basket';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import { artProducts as initialProducts } from './data/products';

// Тип для одного товара
interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  size: string;
  image: string;
  description: string;
  inBasket: boolean;
  quantity: number;
  entered: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  const basketItems = products.filter(item => item.inBasket);
  const changeEntered = (id: number)=> {
    setProducts(prev => prev.map((item)=> item.id === id 
          ? { ...item, entered: !item.entered } 
          : item
  ))
  }
  const toggleBasket = (id: number) => {
    setProducts(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, inBasket: !item.inBasket, entered: true, quantity : !item.inBasket? 1: 0} 
          : item
      )
    );
  };
  const addQuantity =(id: number) => {
    setProducts(prev => prev.map((item)=> item.id === id 
          ? { ...item, quantity: item.quantity+ 1 } 
          : item
  ))
  }
  const remQuantity =(id: number) => {
    setProducts(prev => prev.map((item)=> {
      if(item.id === id) {
        if(item.quantity === 1) {
          toggleBasket(item.id)
          return {...item}
        }
        return { ...item, quantity: item.quantity-1 }
      }
return item
    }
  ))
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Products products={products} onToggleBasket={toggleBasket} remQuantity={remQuantity} addQuantity={addQuantity}/>}/>
        <Route path="/basket"  element={<Basket basketItems={basketItems} onToggleBasket={toggleBasket}addQuantity={addQuantity} remQuantity={remQuantity} changeEntered={changeEntered}/>}/>
        <Route path="/products/:id" element={<ProductPage  products={products} onToggleBasket={toggleBasket}addQuantity={addQuantity} remQuantity={remQuantity}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;