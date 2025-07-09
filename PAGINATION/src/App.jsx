import { useEffect, useState, useRef } from 'react'
import './App.css'
import ProductsCart from '../components/ProductsCart'
import { Pagination } from "antd";
import ProductCategory from '../components/ProductCategory';

function App() {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(20) // Start with smaller initial limit
  const [skip, setSkip] = useState(0)
  // const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [category, setCategory] = useState([])
  const [choosenCateory, setChoosenCategory] = useState("All")
  const scrollPositionRef = useRef(0)


  // products api
  useEffect(() => {
     setLoading(true)
    const url = choosenCateory === "All" ? 
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`:
    `https://dummyjson.com/products/category/${choosenCateory}?limit=${limit}&skip=${skip}`
   
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (skip === 0) {
          // First load or reset
          setProducts(res.products)
        } else {
          // Append new products
          setProducts(prev => [...prev, ...res.products])
        }
        console.log("response=>", res)
        setTotal(res.total)
        setHasMore(res.products.length > 0)
        setLoading(false)

        // Restore scroll position after update
        if (scrollPositionRef.current > 0) {
          window.scrollTo(0, scrollPositionRef.current)
        }
      })
      .catch((err) => {
        console.log("error", err)
        setLoading(false)
      })
  }, [limit, skip, choosenCateory])




  // -----------------------------------------------------------------------------------------------------------------------
  // <<<-----------------handle pagination on scroll code-------------->>>
  // -----------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY

      // Check if we're near bottom
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setSkip(products.length) // Skip already loaded products
        setLimit(20) // Load next batch
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore, products.length])

  // -----------------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------


  // products_ category api

  useEffect(() => {

    setLoading(true)
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((res) => {
        console.log("response of categories=> ", res)
        setCategory(res)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log("error from categories=> ", err)
      })
  }, [])
  
console.log("choosen_category ", choosenCateory)

  return (
    <div>

      <div className='flex flex-wrap gap-3 justify-start items-center p-5'>
        <ProductCategory 
              category={{
                name: "All",
                slug: "All"
              }}
              isChoosen={choosenCateory === "All"}
              onClick={()=> setChoosenCategory("All") }/>
        {
          
          category.map((category) => (
          
              <ProductCategory
                onClick={() => setChoosenCategory(category.slug)}
                category={category}
                key={category.slug}
                isChoosen={category.slug === choosenCateory}
                
              />
          
            
              ))

              
        }
        
      </div>

      <h1 className='flex justify-center items-center text-3xl text-purple-500'>
        INFINITE SCROLL
      </h1>

      {loading && products.length === 0 ? (
        <h1>Loading data...</h1>
      ) : (
        <div className="flex justify-center items-center flex-wrap m-4">
          {products.map((data) => (
            <ProductsCart data={data} key={data.id} />
          ))}
        </div>
      )}

      {loading && products.length > 0 && <div className="text-center py-4">Loading more products...</div>}
      {!hasMore && <div className="text-center py-4">No more products to load</div>}




      {/* // -----------------------------------------------------------------------------------------------------------------------
    // <<<-----------------handle pagination on page cahnge-------------->>>
// ----------------------------------------------------------------------------------------------------------------------- */}
      {/* <Pagination
    onChange={(num)=> setSkip((num - 1) * limit)}
     defaultCurrent={1} total={total} pageSize={limit}
     onShowSizeChange={(page, pageSize)=> setLimit(pageSize)}
     />; */}
    </div>
  )
}

export default App