import { createContext, useState } from "react";


export const CartContext = createContext()

function CartContextProvider({ children }) {

    const [cartItems, setCartItems] = useState([])

    function addItemToCart(item) {
        // item add nhi hai to add krdo
        // agar item add hai to uski quantity brhado

        //check if item exists
        const arr = cartItems
        const itemIndex = cartItems.findIndex((data) => data.id == item.id)
        if (itemIndex == -1) // matlab item cart mai nhi hai
        {
            arr.push({ ...item, quantity: 1 })
        } else {
            arr[itemIndex].quantity++
        }
        setCartItems([...arr])
    }

    function removeItemFromCart(id) {
        const arr = cartItems
        const itemIndex = cartItems.findIndex((data) => data.id == id)
        arr.splice(itemIndex, 1)
        setCartItems([...arr])

    }


    function isItemAdded(id) {
        const arr = cartItems
        const itemIndex = arr.findIndex((data) => data.id == id)
        if (itemIndex == -1) {
            return null
        } else {
            return arr[itemIndex]
        }
    }

      function decreaseItemFromCart(item) {
  const arr = [...cartItems] // make a copy for React state update
  const itemIndex = cartItems.findIndex((data)=> data.id == item.id)
  if(itemIndex !== -1){
    if(arr[itemIndex].quantity > 1){
        arr[itemIndex].quantity--
    }else{
        arr.splice(itemIndex ,1)
    }
    setCartItems(arr)
  }
  
}

    return <CartContext.Provider value={{ decreaseItemFromCart, cartItems, addItemToCart, removeItemFromCart, isItemAdded }}>{children}</CartContext.Provider>
}



export default CartContextProvider