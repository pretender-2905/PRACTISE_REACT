import { useEffect, useState, useRef, useContext } from "react"
import ProductsCart from "../components/ProductsCart"
import { Spinner } from "@heroui/react"
import ProductsCategory from "../components/ProductsCategory"
import { CartContext } from "../context/CartContext"
import { useSearchParams } from "react-router"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState([])
  const scrollPositionRef = useRef(0)

const [searchParams, setSearchParams] = useSearchParams()
const choosenCategory = searchParams.get("category") || "All"

  useEffect(() => {
    const url =
      // Fetch products
      choosenCategory === "All"
        ? `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products/category/${choosenCategory}?limit=${limit}&skip=${skip}`

    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (skip === 0) {
          setProducts(res.products)
        } else {
          setProducts((prev) => [...prev, ...res.products])
        }
        console.log("response=>", res)
        setTotal(res.total)
        setHasMore(res.products.length > 0)
        setLoading(false)

        if (scrollPositionRef.current > 0) {
          window.scrollTo(0, scrollPositionRef.current)
        }
      })
      .catch((err) => {
        console.log("error", err)
        setLoading(false)
      })
  }, [limit, skip, choosenCategory])

  // Fetch categories
  useEffect(() => {
    setLoading(true)
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((res) => {
        console.log("RESPONSE FROM CATEGORY API", res)
        setCategory(res)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log("ERROR FROM PRODUCT CATEGORY API: ", error)
        alert("SOMETHING WENT WRONG IN THE PRODUCTS CATEGORY")
      })
  }, [])

  // Reset skip when category changes
  useEffect(() => {
    setSkip(0)
  }, [choosenCategory])

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY

      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setSkip(products.length)
        setLimit(20)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore, products.length])

  return (
    <div>
      <div className="flex gap-2 flex-wrap  items-center p-5">

        <ProductsCategory 
        onClick={()=> setSearchParams({category:"All"})}
        isChoosen={choosenCategory === "All"}
        category={{
          name: "All",
          slug: "All"
        }} />
        
        {
         category.map((category) => (
          <ProductsCategory
            onClick={() => setSearchParams({category: category.slug})}
            isChoosen={category.slug === choosenCategory}
            category={category}
            key={category.slug}
          />
        ))
      }
      
      </div>
      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.map((data) => (
            <ProductsCart data={data} key={data.id} />
          ))}
        </div>
      )}

      {loading && products.length > 0 && (
        <div className="text-center py-4">Loading more products...</div>
      )}
      {!hasMore && (
        <div className="text-center py-4">No more products to load</div>
      )}
    </div>
  )
}

export default Products
