import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import { getAllProducts } from '../utils/getProducts'

// use useEffect
function App() {

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
 


  useEffect(() => {
    fetchProducts()
  }, [])


useEffect(()=>{
  console.log("Cart Items: ", cartItems)
}, [cartItems])
  


  const fetchProducts = async () => {
    const products = await getAllProducts()
    setProducts([...products])
    console.log(products)
  }

  const addToCartItems = (item)=>{
   const  items = [...cartItems]

   const itemInd =  items.findIndex((cartItems)=> cartItems.id == item.id)
   if(itemInd == -1){
     console.log(itemInd)
      items.push(item)
      setCartItems([...items])

   }

  }



  return (
    <div className='containerv'>
     <div className='fixed w-full h-[100px] bg-white flex flex-col sm:flex-row items-center top-0 justify-center sm:justify-center gap-4 sm:gap-10 '>
       <h1 className='text-3xl font-bold text-green-600 text-center  underline'>SHOPPING LIST</h1>
       <h1 className='text-2xl font-bold text-black-600  '>Cart Items: {cartItems.length}</h1>
     </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">-
            {
            
              products.map((data, index) => {
               const isAddedToCart = cartItems.findIndex((cartItem)=> cartItem.id == data.id ) !== -1
               console.log(isAddedToCart)
                return (
                  <Card
                  isAddedToCart={isAddedToCart}
                    key={data.id}
                  addToCart={()=> addToCartItems(data)}
                    items={data}
                    />
                )
              })
            }

          </div>
        </div>
      </section>

    </div>
  )

}

export default App

// notes
// useEffect(setup, dependencies)

// syntax
// useEffect(()=> {}, [])
//use effect do arguments leta hai, aik setup aur doosra dependencies, setup matlab function, jo hum run kr waty hain usee effect mai, aur dependency matalb [].
