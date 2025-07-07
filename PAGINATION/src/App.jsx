import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(50)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res=> ", res)
        setProducts(res.products)
        setTotal(res.total)

      })
      .catch((err) => {
        console.log("error", err)
      })
  }, [])

  console.log("total=> ", total)
  console.log("products=> ", products)
  

  return (
    <div>
      <h1 className='flex justify-center items-cneter text-9xl text-purple-500'>
        PAGINATION
      </h1>
    </div>
  )
}

export default App
