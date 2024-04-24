import { Link } from 'react-router-dom';
import { useContext } from 'react';
import '../styles/PageNavBar.css';
import Basket from './BasketModal';
import BasketContext from './BasketContext';

const PageNavBar = ({openModal}) => {

    const {selectedItems} = useContext(BasketContext);
    const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);



    return (
        <nav>
            <Link to='/'>home</Link>
            <div className="nav-items">
                <ul>
                    <div className="nav-items-links">
                        <Link to='/pages/Home' >Home</Link>
                        <Link to='/pages/Menu' >Menu</Link>
                        <Link to='/pages/Contact' >Contact</Link>
                    </div>
                    <button onClick={openModal}>Basket</button><span>{totalQuantity}</span>

                        <Basket />
                </ul>
            </div>
        </nav>
    )
}
export default PageNavBar