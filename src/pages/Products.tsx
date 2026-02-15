import React, { useState} from "react"

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
}

export default function Products({ products, onToggleBasket }: ProductsProps) {
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
      <img src={`${process.env.PUBLIC_URL}/images/backet.png`} alt="" className="basketImg" />

      <div className="cards"> 
        {filteredArts.map(item => (
          <div key={item.id} className="card">
            <img 
              src={`${process.env.PUBLIC_URL}/images/${item.inBasket ? "green-paint-brush-stroke-check-marks_1163725-3313.png" : "backet.png"}`} 
              alt="" 
              id="baskCard"
              onClick={() => onToggleBasket(item.id)}
            />
            <img src={item.image} alt="artPoster" />
            <div className="info">
              <h3>{item.title}</h3>
              <p>{item.price} ₽</p>
            </div>
            <div className="button">
              <button>Подробнее</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}