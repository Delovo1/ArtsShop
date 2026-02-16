import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  size: string;
  image: string;
  description?: string;
  inBasket: boolean;  
  quantity: number;
}

interface ProductsProps {
  products: Product[];
  onToggleBasket?: (id: number) => void;
  addQuantity?: (id: number) => void;
  remQuantity?: (id: number) => void;
}

export default function ProductPage({ products, onToggleBasket, addQuantity, remQuantity }: ProductsProps) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <div className="not-found">Товар не найден</div>;

  const oldPrice = Math.round(product.price * 1.1);

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-artist">{product.artist}</p>
          
          <div className="price-block">
            <span className="current-price">{product.price.toLocaleString()} ₽</span>
            <span className="old-price">{oldPrice.toLocaleString()} ₽</span>
          </div>

          <p className="product-size">Размер: {product.size}</p>

          {product.description && (
            <div className="product-description">
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>
          )}
        </div>

        <div className="product-action">
          {!product.inBasket ? (
            <button 
              className="add-to-cart-btn"
              onClick={() => onToggleBasket && onToggleBasket(product.id)}
            >
              В корзину
            </button>
          ) : (
            <div className="quantity-control">
              <button 
                className="quantity-btn"
                onClick={() => remQuantity && remQuantity(product.id)}
              >
                -
              </button>
              <span className="quantity-value">{product.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => addQuantity && addQuantity(product.id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}