import { Link } from 'react-router-dom';
interface BasketItem {
  id: number;
  title: string;
  artist: string;
  price: number;
  size: string;
  image: string;
  description: string;
  inBasket: boolean;
  quantity: number;
  entered: boolean
}

interface BasketProps {
  basketItems: BasketItem[];
  onToggleBasket: (id: number) => void;
  addQuantity: (id: number) => void;
  remQuantity: (id: number) => void;
  changeEntered: (id: number) => void;
  
}

const getProductNoun = (count: number): string => {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return 'товаров';
  if (n1 > 1 && n1 < 5) return 'товара';
  if (n1 === 1) return 'товар';
  
  return 'товаров';
};

export default function Basket({ basketItems, onToggleBasket, addQuantity, remQuantity, changeEntered }: BasketProps) {
    
    return (
        <div className="basket">
            <h2>Корзина ({basketItems.length})</h2>
            <div className="basket-items">
                {basketItems.length !== 0 &&
                <div className="products">
                    {basketItems.map((art) => {
                        const oldPrice = Math.round(art.price * 1.1);
                        return (
                            <div key={art.id} className="basket-item">
                                <img 
                                            className="trashbin" 
                                            src={`${process.env.PUBLIC_URL}/images/image.png`} 
                                            onClick={() => onToggleBasket(art.id)} 
                                            alt="Удалить"
                                        />
                                <input 
                                    type="checkbox" 
                                    checked={art.entered} 
                                    onChange={() => changeEntered(art.id)}
                                />
                            <Link className = "srcBascCard" to={`/products/${art.id}`} ></Link>

                                <img src={art.image} alt={art.title} />
                                <div className="basket-item-info">
                                    <div className="baskinfo">
                                        
                                        <h3>{art.title}</h3>
                                        <p className="artist">{art.artist}</p>
                                        <p>Размер: {art.size}</p>
                                    </div>
                                 
                                    <div className="price-block">
                                        <span className="current-price">{art.price * art.quantity} ₽</span>
                                        <span className="old-price">{oldPrice * art.quantity} ₽</span>
                                    </div>
                                    <div className="quantity">
                                        <button onClick={() => remQuantity(art.id)}>-</button>
                                        <p>{art.quantity}</p>
                                        <button onClick={() => addQuantity(art.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>}
                
                {basketItems.length !== 0 && 
               <div className="order">
    <button>Перейти к оформлению</button>
    <p>Доступные способы и время доставки можно выбрать при оформлении заказа</p>
    
    <div className="mybasket">
        <h3>Ваша корзина</h3>
        <span>
            {basketItems.filter(v => v.entered).reduce((acc, val) => acc + val.quantity, 0)} {getProductNoun(basketItems.filter(v => v.entered).reduce((acc, val) => acc + val.quantity, 0))} 
        </span>
    </div>
    
    <div className="allprice">
        <p>Товары ({basketItems.filter(v => v.entered).reduce((acc, val) => acc + val.quantity, 0)})</p>
        <span>{(basketItems.filter(v => v.entered).reduce((acc, val) => acc + val.quantity * val.price * 1.1, 0)).toFixed(0)} ₽</span>
    </div>
    
    <div className="discount">
        <p>Скидка</p>
        <span>-{Math.round(basketItems.filter(v => v.entered).reduce((acc, val) => acc + val.quantity * val.price, 0) * 0.1)} ₽</span>
    </div>
    
    <div className="finalyprice">
        <h3>Итого</h3>
        <span>{basketItems.filter(v => v.entered).reduce((acc, val) => acc + val.quantity * val.price, 0)} ₽</span>
    </div>
</div>}
            
                {basketItems.length === 0 && 
                    <div className="basket-empty">Корзина пуста</div>
                }
            </div>
        </div>
    );
}