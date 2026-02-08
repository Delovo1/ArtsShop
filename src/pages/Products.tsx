import React, {use, useState} from "react"
interface ProductsProps {
  artProducts: {
    id: number;
    title: string;
    artist: string;
    price: number;
    size: string;
    image: string;
  }[];
}
export default function Products({ artProducts }: ProductsProps) {
  const [search, setSearch] = useState("");
  const filtedArts = artProducts.filter((art)=> art.title.toLowerCase().trim().includes(search.toLowerCase().trim()));
  return (
    <div className="prod">
      <input
        placeholder="Enter some film"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
     <div className="cards"> 
      {filtedArts.map(item => (
        <div key={item.id} className="card">
          <img src={item.image} alt="artPoster" />
          <div className="info">
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
         <div className="button">
          <button>Show more</button>
         </div>
        </div>
      ))}
    </div>
    </div>

  );
}