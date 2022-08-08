import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import {ReactComponent as Logo} from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context"
import './navigation.styles.scss'

import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../contexts/cart.context"

const Navigation = () =>{
    const {currentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)

    return (
      <>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <Logo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP   
                </Link>
                {
                    currentUser ? (
                        <Link className="nav-link" to='/' onClick={signOutUser}>SIGN OUT</Link>
                    ):(
                    <Link className="nav-link" to='/auth'>
                        SIGN IN   
                    </Link>
                    )
                }
                <CartIcon />
            </div> 
            {isCartOpen && <CardDropdown />}
        </div>
        <Outlet />
      </>
    )
  }

  export default Navigation