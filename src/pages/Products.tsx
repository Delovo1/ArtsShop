import React, { useState} from "react"
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  size: string;
  image: string;
  inBasket: boolean;  
  quantity: number;
}

interface ProductsProps {
  products: Product[];
  onToggleBasket: (id: number) => void;
  remQuantity: (id: number) => void;
  addQuantity: (id: number) => void;

}

export default function Products({ products, onToggleBasket , remQuantity ,addQuantity}: ProductsProps) {
  const [search, setSearch] = useState("");
  
  const filteredArts = products.filter((art) => 
    art.title.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  return (
    <div className="prod">
      <input
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link to="/basket"><img src={`${process.env.PUBLIC_URL}/images/backet.png`} alt="" className="basketImg" /></Link>

      <div className="cards"> 
        {filteredArts.map(item => (
          <div key={item.id} className="card">
            <Link className = "srcCard" to={`/products/${item.id}`} ></Link>
            
            <img src={item.image} alt="artPoster" />
            <div className="info">
              <h3>{item.title}</h3>
              <p>{item.price} ₽</p>
            </div>

              {item.quantity === 0 &&
            <div className="button">
              <button onClick={() => onToggleBasket(item.id)}>Добавить в корзину</button>
              </div>
              
              }
              {item.quantity > 0 &&
              <div className="quantity quntincard">
                <button onClick={() => remQuantity(item.id)}>-</button>
                <p><b>{item.quantity}</b></p>
                <button onClick={() => addQuantity(item.id)}>+</button>
              </div>
              }
          </div>
        ))}
      </div>
    </div>
  );
}