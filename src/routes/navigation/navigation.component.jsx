import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import {ReactComponent as Logo} from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx'

import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../contexts/cart.context"

const Navigation = () =>{
    const {currentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)

    return (
      <>
        <NavigationContainer>
            <LogoContainer to='/'>
                <Logo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP   
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' to='/' onClick={signOutUser}>SIGN OUT</NavLink>
                    ):(
                    <NavLink to='/auth'>
                        SIGN IN   
                    </NavLink>
                    )
                }
                <CartIcon />
            </NavLinks> 
            {isCartOpen && <CardDropdown />}
        </NavigationContainer>
        <Outlet />
      </>
    )
  }

  export default Navigation