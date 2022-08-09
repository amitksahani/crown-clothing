import './cart-dropdown.styles.scss'
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
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((item)=><CartItem key={item.id} cartItem={item} />)
                }
            </div>
            <Button onClick={goToCheckOut}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CardDropdown