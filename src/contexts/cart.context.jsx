import { createContext, useState, useEffect } from "react";

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

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [total, setTotal] = useState(0)

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd))
    }

    const deleteItemFronCart = (productToDelete) => {
        setCartItems(deleteCartItems(cartItems, productToDelete))
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearItem(cartItems, productToRemove))
    }

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, item)=> total + item.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(()=>{
        const newTotal = cartItems.reduce((total, item)=> total + item.quantity * item.price, 0)
        setTotal(newTotal)
    }, [cartItems])

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, deleteItemFronCart, clearItemFromCart, total}

   

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}