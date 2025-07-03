import { Spinner } from "@heroui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import ProductCart from "../components/ProductCart"
import ProductsCategory from "../components/ProductsCategory"

function Products() {

    const [products, setProducts] = useState([])
    const [Category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)


    // products api
    useEffect(() => {

        axios
            .get('https://dummyjson.com/products')
            .then((res) => {
                console.log("DATA=>", res?.data?.products)
                setProducts(res.data?.products)
                setLoading(false)
            })
            .catch((err) => {
                console.log("ERROR: ", err)
                setLoading(false)
            })

    }, [])

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
                            <Spinner className={{ label: "text-foreground mt-4" }}  label="Please wait..." variant="simple" />
                            </div>
                        
                    ) :
                    (
                        <div>
                        <div className="flex gap-3 flex-wrap m-6"> 

                             <ProductsCategory category={ {
                                    slug: "All",
                                    name: "All"
                                } }  />
                                
                            {
                            Category.map((category)=>(
                                <ProductsCategory category={category} key={category.slug} />
                            ))
                            }
                        </div>

                        <div className="flex flex-wrap m-6">
                           {
                            products.map((item)=>(
                                <ProductCart item={item} key={item.id}/>
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