import { Spinner } from "@heroui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import ProductCart from "../components/ProductCart"
import ProductsCategory from "../components/ProductsCategory"
import { useSearchParams } from "react-router-dom"
function Products() {
    const [products, setProducts] = useState([])
    const [Category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams , setSearchParams] = useSearchParams()
    const choosenCategory = searchParams.get("category") || "All"
   

   
    // products api
    useEffect(() => {
        const url = choosenCategory === "All" 
        ? "https://dummyjson.com/products" :
        `https://dummyjson.com/products/category/${choosenCategory}`
        axios
            .get(url)
            .then((res) => {
                console.log("DATA=>", res?.data?.products)
                setProducts(res.data?.products)
                setLoading(false)
            })
            .catch((err) => {
                console.log("ERROR: ", err)
                setLoading(false)
            })
    }, [choosenCategory])
    // products cateory api
    useEffect(() => {

        axios
            .get('https://dummyjson.com/products/categories')
            .then((res) => {
                setCategory(res?.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log("ERROR: ", err)
                setLoading(false)
            })

    }, [])
    return (
        <div>
            {
                loading ?
                    (
                        <div className="w-full h-96 flex justify-center items-center">
                            <Spinner className={{ label: "text-foreground mt-4" }} label="Please wait..." variant="simple" />
                        </div>

                    ) :
                    (
                        <div>
                            <div className="flex gap-3 flex-wrap m-6">

                                <ProductsCategory 
                                
                                onClick={()=> setSearchParams({category: "All"})}
                                isChoosen={choosenCategory === "All"} category={{
                                    slug: "All",
                                    name: "All"
                                }} />

                                {
                                    Category.map((category) => (
                                        <ProductsCategory
                                            onClick={() => setSearchParams({category: category.slug})}
                                            isChoosen={category.slug === choosenCategory}
                                            category={category}
                                            key={category.slug} />
                                    ))
                                }
                            </div>

                            <div className="flex flex-wrap m-6">
                                {
                                    products.map((item) => (
                                        <ProductCart item={item} key={item.id} />
                                    ))
                                }
                            </div>
                        </div>
                    )
            }
        </div>


    )
}
export default Products