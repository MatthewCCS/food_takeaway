import { useContext } from "react";
import BasketContext from './BasketContext';
import '../styles/Basket.css'

const BasketModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const { selectedItems, handleIncreaseClick, handleDecreaseClick, handleRemoveItem } = useContext(BasketContext);
  const totalBasketPrice = selectedItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2);


  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h2>Basket</h2>
        <ul>
          {selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <div key={item.id} className="basket--item">
                <li key={item.id}>
                  <span>{item.name} </span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>


                </li>
                <div className="basket--item--control">
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseClick(index)}>+</button>
                  <button onClick={() => handleDecreaseClick(index)}>-</button>
                  <button onClick={() => handleRemoveItem(item.id)}>remove</button>
                </div>


              </div>
            ))
          ) : (
            <p>Empty</p>
          )}
        </ul>
        <p>Total: £{totalBasketPrice}</p>
      </div>
    </div>
  );
};


export default BasketModal