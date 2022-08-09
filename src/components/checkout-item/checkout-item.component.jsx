import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout-item.styles.scss'

const CheckoutItem = ({item}) => {

    const {name, imageUrl, price, quantity} = item;
    const {addItemToCart, deleteItemFronCart, clearItemFromCart} = useContext(CartContext)

    const clearHandler = ()=>clearItemFromCart(item)
    const deleteHandler = ()=>deleteItemFronCart(item)
    const addHandler = ()=>addItemToCart(item)

    return (
        <div className="checkout-item-container" >
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={deleteHandler}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow"  onClick={addHandler}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={clearHandler}>&#10005;</span>
        </div>
    )
}

export default CheckoutItem;
