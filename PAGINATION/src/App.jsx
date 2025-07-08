import { useEffect, useState } from 'react'
import './App.css'
import ProductsCart from '../components/ProductsCart'

function App() {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(50)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res=> ", res)
        setProducts(res.products)
        setTotal(res.total)
        setLoading(false)
      })
      .catch((err) => {
        console.log("error", err)
        setLoading(false)
      })
  }, [limit])

  console.log("total=> ", total)
  console.log("products=> ", products)

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.document.documentElement.scrollTop ==
        window.document.documentElement.offsetHeight
      ) {
        setLimit(limit + 20)
      }
    }

    window.addEventListener("scroll", handleScroll)
  }, [limit])

  return (
    <div>
      <h1 className='flex justify-center items-cneter text-3xl text-purple-500 '>
        PAGINATION
      </h1>

      {
        loading ? (
          <h1>Loading data...</h1>
        ) : (
          <div className="flex justify-center items-center flex-wrap m-4">
            {
              products.map((data) => (
                <ProductsCart data={data} key={data.id} />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default App



// import { useEffect, useState, useRef } from 'react'
// import './App.css'
// import ProductsCart from '../components/ProductsCart'

// function App() {
//   const [products, setProducts] = useState([])
//   const [limit, setLimit] = useState(20) // Start with smaller initial limit
//   const [skip, setSkip] = useState(0)
//   const [total, setTotal] = useState(0)
//   const [loading, setLoading] = useState(false)
//   const [hasMore, setHasMore] = useState(true)
//   const scrollPositionRef = useRef(0)

//   useEffect(() => {
//     setLoading(true)
//     fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
//       .then((res) => res.json())
//       .then((res) => {
//         if (skip === 0) {
//           // First load or reset
//           setProducts(res.products)
//         } else {
//           // Append new products
//           setProducts(prev => [...prev, ...res.products])
//         }
//         setTotal(res.total)
//         setHasMore(res.products.length > 0)
//         setLoading(false)
        
//         // Restore scroll position after update
//         if (scrollPositionRef.current > 0) {
//           window.scrollTo(0, scrollPositionRef.current)
//         }
//       })
//       .catch((err) => {
//         console.log("error", err)
//         setLoading(false)
//       })
//   }, [limit, skip])

//   useEffect(() => {
//     const handleScroll = () => {
//       // Save current scroll position
//       scrollPositionRef.current = window.scrollY
      
//       // Check if we're near bottom
//       if (
//         window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
//         !loading &&
//         hasMore
//       ) {
//         setSkip(products.length) // Skip already loaded products
//         setLimit(20) // Load next batch
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [loading, hasMore, products.length])

//   return (
//     <div>
//       <h1 className='flex justify-center items-center text-3xl text-purple-500'>
//         INFINITE SCROLL
//       </h1>

//       {loading && products.length === 0 ? (
//         <h1>Loading data...</h1>
//       ) : (
//         <div className="flex justify-center items-center flex-wrap m-4">
//           {products.map((data) => (
//             <ProductsCart data={data} key={data.id} />
//           ))}
//         </div>
//       )}

//       {loading && products.length > 0 && <div className="text-center py-4">Loading more products...</div>}
//       {!hasMore && <div className="text-center py-4">No more products to load</div>}
//     </div>
//   )
// }

// export default App