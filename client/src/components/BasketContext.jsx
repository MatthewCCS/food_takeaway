import { createContext, useState } from 'react';

const BasketContext = createContext();

export function BasketProvider({ children }) {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleAddToBasket = (item) => {
        setSelectedItems((prevSelectedItems) => {
            const existingSelectedItem = prevSelectedItems.find(
                (selectedItem) => selectedItem.id === item.id
            );

            if (existingSelectedItem) {
                // If item is already in the basket, update its quantity
                existingSelectedItem.quantity += item.quantity;
                return [...prevSelectedItems]; // Return a new array to trigger re-render
            } else {
                // If item is not in the basket and its quantity is greater than 0, add it
                if (item.quantity > 0) {
                    return [...prevSelectedItems, { ...item }]; // Add a new item with the specified quantity
                } else {
                    // If quantity is 0 or less, do not add to the basket
                    return [...prevSelectedItems];
                }
            }
        });
    };

    const handleIncreaseClick = (index) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[index] = {
                ...updatedSelectedItems[index],
                quantity: updatedSelectedItems[index].quantity + 1,
            };
            return updatedSelectedItems;
        });
    };

    const handleDecreaseClick = (index) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[index] = {
                ...updatedSelectedItems[index],
                quantity: Math.max(1, updatedSelectedItems[index].quantity - 1),
            };
            return updatedSelectedItems;
        });
    };

    const handleRemoveItem = (itemId) => {
        const confirmed = window.confirm('Remove item?');

        if (confirmed) {
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((item) => item.id !== itemId)
            );
        }
    };

    return (
        <>
            <BasketContext.Provider value={{ selectedItems, handleAddToBasket, handleIncreaseClick, handleDecreaseClick, handleRemoveItem }}>
                {children}
            </BasketContext.Provider>
        </>
    );
}

export default BasketContext;