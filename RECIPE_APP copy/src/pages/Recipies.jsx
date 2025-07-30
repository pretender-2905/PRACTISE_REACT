import { useQuery } from "@tanstack/react-query"
import { fetchRecipeBySearch, fetchRecipies } from "../utils/todos";
import RecipeCart from "../components/RecipeCart";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from "react";

function Recipies(){
    const [search, setSearch] = useState("")
    const [searching, setSearching] = useState(false)

    // const data  = {} = data
    const {data = {}, isError, isLoading, error} = useQuery({
        queryKey: ['recipe'],
        queryFn: fetchRecipies
    })

     const {data: recipe = {}, refetch : refetchSearch} = useQuery
     ({queryKey:['searchRecipe', search],
     queryFn: ()=> fetchRecipeBySearch(search),
    enabled: false
    })
    
 const handleSearch = () => {
  if (search.trim() === "") {
    setSearching(false); // show all recipes again
  } else {
    setSearching(true);  // show filtered results
    refetchSearch();     // trigger search API
  }
};

    console.log("recipies=> ", data)
    console.log("search=> ", search)
    return(
        <div>
            <div className="">Recipies</div>
            <div className="flex justify-center items-center">

            <TextField  onChange={(e)=> setSearch(e.target.value)} variant="outlined" label="Enter Recipe" color="error" sx={{width:"60rem", margin:"30px"}} />
            <Button onClick={handleSearch}  startIcon={<SearchOutlinedIcon />} value="Search" variant="outlined" color="error" sx={{
    width: { xs: '100%', sm: 'auto' },         // full-width on mobile
    fontSize: { xs: '0.8rem', sm: '1rem' },     // smaller font on mobile
    px: { xs: 1.5, sm: 3 },                     // responsive horizontal padding
    py: { xs: 1, sm: 1.5 }                      // responsive vertical padding
  }}
>Search</Button>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"> 
       {(searching ? recipe.recipes : data?.recipes)?.map((data)=>(
        <RecipeCart data={data} key={data.id} />
       ))}
       
    
            

          </div>
        </div>
    )
}
export default Recipies