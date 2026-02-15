import React from "react"
import { Link , useLocation} from 'react-router-dom';

export default function Nav() {
      const location = useLocation();
    return <nav>
        <Link to="/" className={`${location.pathname==="/"? "activesrc": ""}`}>Main</Link>
        <Link to="/products"  className={`${location.pathname==="/products"? "activesrc": ""}`}>Products</Link>
        <Link to="/basket" className={`${location.pathname==="/basket"? "activesrc": ""}`}>Basket</Link>
      </nav>
}