import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducers/reducers.utils";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>null,
    cartItems: [],
    addItemToCart: ()=>{},
    deleteCartItems:()=>{},
    clearItem:()=>{},
    cartCount: 0,
    total:0
})

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    total:0
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }

}

const addCartItems = (cartItems, productToAdd) => {

    const itemExists = cartItems.find((item)=>item.id === productToAdd.id)

    if(itemExists){
        return cartItems.map((item) => (
            item.id === productToAdd.id 
            ? {...item, quantity: item.quantity+1}
            : item
        ))
    }
    return [...cartItems, {...productToAdd, quantity:1}]
}

const deleteCartItems = (cartItems, productToDelete) => {

    const itemToDelete = cartItems.find((item)=>item.id === productToDelete.id)

    if(itemToDelete.quantity>1){
        return cartItems.map((item) => (
            item.id === productToDelete.id 
            ? {...item, quantity: item.quantity-1}
            : item
        ))
    }
    return cartItems.filter((item)=>item.id !== productToDelete.id)
}

const clearItem = (cartItems, productToRemove) => {

    return cartItems.filter((item)=>item.id !== productToRemove.id)
}


export const CartProvider = ({children}) => {

    const [{cartItems, cartCount, total, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const addItemToCart = (productToAdd) => {
        const newCartItem = addCartItems(cartItems, productToAdd)
        updateCartItemReducer(newCartItem)
    }

    const deleteItemFronCart = (productToDelete) => {
        const newCartItem = deleteCartItems(cartItems, productToDelete)
        updateCartItemReducer(newCartItem)
    }

    const clearItemFromCart = (productToRemove) => {
        const newCartItem = clearItem(cartItems, productToRemove)
        updateCartItemReducer(newCartItem)
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }


    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, item)=> total + item.quantity, 0)
        const newTotal = newCartItems.reduce((total, item)=> total + item.quantity * item.price, 0)
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems:newCartItems, cartCount: newCartCount, total: newTotal}))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, deleteItemFronCart, clearItemFromCart, total}

   

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}