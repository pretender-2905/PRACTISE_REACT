import { useContext } from "react";
import { CartContext } from "../context/CartContext";
function Cart(){

    const {cartItems, addItemToCart, removeItemFromCart, isItemAdded} = useContext(CartContext)
    const total = cartItems.reduce((sum,item)=> sum + (item.price * item.quantity), 0)









 return (
    <div>
        <div>

            prodcuts
            {
                cartItems.map((item)=>(
                
                    <div className="flex flex-col gap-4">
                        <img src={item.thumbnail} width={50}/>
                        <p>title: {item.title}</p> 
                        <p>price: {item.price}</p>
                        <p>quanitty; {item.quantity}</p>
                    </div>
                    
                ))
            }

            <div className="text-9xl">
                TOTAL :{ total}
            </div>
        </div>
    </div>
  );
}

export default Cart;