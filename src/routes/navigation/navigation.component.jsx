import { useContext } from "react"
import { Outlet } from "react-router-dom"
import {useSelector} from 'react-redux'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx'
import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../contexts/cart.context"
import { selectCurrentUser } from "../../store/user/user.selector"

const Navigation = () =>{

    const currentUser = useSelector(selectCurrentUser)
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