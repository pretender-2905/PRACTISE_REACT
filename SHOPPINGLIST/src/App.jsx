import { useEffect, useState} from 'react'
import './App.css'
import Card from './components/Card'
import { getAllProducts } from '../utils/getProducts'

// use useEffect
function App() {

const [products, setProducts] = useState([])


useEffect(()=> {
  fetchProducts() 
},[])


   const fetchProducts = async ()=> {
    const products = await getAllProducts()
    setProducts([...products])
    console.log(products)
  }
  
  return(
  <div className='container mx-auto my-10'>
    <h1 className='text-3xl font-bold text-green-600 text-center '>MUHAMMAD IBRAHIM'S STORE</h1>
    <h1 className='text-xl text-red-600 text-center underline '>Under Construction</h1>
    <h1 className='text-3xl font-bold text-green-600 text-center  underline'>SHOPPING LIST</h1>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
{
  products.map((data, index)=>{
    return(
      <Card key={data.id} items={data} />
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
