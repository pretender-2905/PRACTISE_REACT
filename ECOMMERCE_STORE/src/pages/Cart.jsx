import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Form, Input } from 'antd';
import { MinusOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';


function Cart(){

    const {cartItems, addItemToCart, removeItemFromCart, isItemAdded, decreaseItemFromCart } = useContext(CartContext)
    const total = cartItems.reduce((sum,item)=> sum + (item.price * item.quantity), 0)









 return (
    
        <div className="container mx-auto my-5">

            prodcuts
            {
                cartItems.map((item)=>(
                
                    <div className="border flex my-2 p-3 gap-5 ">
                        <img src={item.thumbnail} width={120} height={90}/>

                        <div className="flex flex-col">
                        
                        <p className="font-bold text-xl">{item.title} ({item.category})</p> 
                        <p>{item.description}</p>
                        <p className="font-bold text-xl text-green-600">Price: ${item.price}</p>
                         <div className="flex flex-row gap-3">
                          <Button onClick={()=> addItemToCart(item)} icon={<PlusOutlined />} />
                           Quantity: {item.quantity}
                          <Button onClick={()=> decreaseItemFromCart(item)} icon={<MinusOutlined />} />
                        </div>
                        </div>
                    </div>
                    
                ))
            }

            <div className="text-9xl">
                TOTAL :{ total}
            </div>
        </div>
    
  );
}

export default Cart;