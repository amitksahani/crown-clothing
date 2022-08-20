import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'
import Button from '../button/button.component'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import { useNavigate } from 'react-router-dom';


const CardDropdown = () =>{

    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckOut = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?(
                     cartItems.map((item)=><CartItem key={item.id} cartItem={item} />)
                     ):(
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                     )
                }
            </CartItems>
            <Button onClick={goToCheckOut}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CardDropdown