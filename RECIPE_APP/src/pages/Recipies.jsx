import { useQuery } from "@tanstack/react-query"
import { fetchRecipies } from "../utils/todos";
import RecipeCart from "../components/RecipeCart";

function Recipies(){

    // const data  = {} = data
    const {data = {}, isError, isLoading, error} = useQuery({
        queryKey: ['recipe'],
        queryFn: fetchRecipies
    })

    console.log("recipies=> ", data)
    return(
        <div>
            <div className="">Recipies</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"> 
        {
            data.recipes?.map((data)=>(
                 <RecipeCart data={data} key={data.id} />
            ))
        }

          </div>
        </div>
    )
}
export default Recipies