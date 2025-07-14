import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Divider, Badge, Card, Space } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router";

function Cart() {
    const { cartItems, addItemToCart, removeItemFromCart, decreaseItemFromCart } = useContext(CartContext);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = Math.round(total);
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity), 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <ShoppingCartOutlined className="mr-3" />
                    Your Shopping Cart
                </h1>
                <Badge 
                    count={totalQuantity} 
                    className="ml-4 bg-purple-600" 
                    style={{ backgroundColor: '#7b1fa2' }}
                />
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">Your cart is empty</p>
                    <p className="text-gray-500 mt-2">Start shopping to add items to your cart</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {cartItems.map((item) => (
                                <Card 
                                    key={item.id} 
                                    className="mb-4 shadow-sm hover:shadow-md transition-shadow"
                                    bodyStyle={{ padding: 0 }}
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/4 p-4 flex justify-center">
                                            <img 
                                                src={item.thumbnail} 
                                                alt={item.title}
                                                className="w-full h-auto max-h-48 object-contain"
                                            />
                                        </div>
                                        <div className="md:w-3/4 p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                                                </div>
                                                <Button 
                                                    style={{fontSize: "1.5rem"}}
                                                    danger 
                                                    type="text" 
                                                    icon={<DeleteOutlined />} 
                                                    onClick={() => removeItemFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                />
                                            </div>

                                            <Divider className="my-3" />

                                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                                <p className="text-lg font-bold text-green-600 mb-2 sm:mb-0">
                                                   Each: ${item.price.toFixed(2)}
                                                </p>
                                                
                                                <div className="flex items-center space-x-4">
                                                    <Button 
                                                        shape="circle" 
                                                        icon={<MinusOutlined />} 
                                                        onClick={() => decreaseItemFromCart(item)}
                                                        disabled={item.quantity <= 1}
                                                        className="flex items-center justify-center"
                                                    />
                                                    <span className="text-lg font-medium w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button 
                                                        shape="circle" 
                                                        icon={<PlusOutlined />} 
                                                        onClick={() => addItemToCart(item)}
                                                        className="flex items-center justify-center"
                                                    />
                                                </div>
                                                
                                                <p className="text-lg font-medium mt-2 sm:mt-0">
                                                   Total: ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <Card 
                                title="Order Summary" 
                                className="shadow-sm sticky top-4"
                                headStyle={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
                                        <span className="font-medium">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">FREE</span>
                                    </div>
                                    <Divider />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${totalAmount.toFixed(2)}</span>
                                    </div>
                                   <Link to={"/checkout"}>
                                    <Button 
                                    
                                        type="primary" 
                                        size="large" 
                                        block
                                        className="h-12 mt-6"
                                        style={{
                                            background: 'linear-gradient(to right, #7b1fa2, #4527a0)',
                                            border: 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = 'linear-gradient(to right, #6a1b9a, #3d1b92)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'linear-gradient(to right, #7b1fa2, #4527a0)';
                                        }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                   </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;