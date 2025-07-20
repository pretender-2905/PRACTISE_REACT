import Rating from "@mui/material/Rating"
import { Link } from "react-router"

function RecipeCart({data}){

    const {image, name, cuisine, mealType, rating, id} = data
    return(
       <Link to={`/recipes/${id}`}>
        <div>
            <div className=" p-4 w-full border-2 border-red-800 rounded-lg pb-10 hover:bg-neutral-300 hover:scale-105 duration-500 transition-all ease-in-out cursor-pointer">
  <a className="block relative h-48 rounded overflow-hidden">
    <img
      alt="ecommerce"
      className="object-cover object-center w-full h-full block hover:scale-150  duration-1000 transition-all ease-in-out"
      src={image}
    />
  </a>
  <div className="mt-4 ">
    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
    {cuisine}
    </h3>
    <div className="flex flex-row gap-2 justify-between">
      <div className="flex gap-3">

{mealType.map((type, ind)=>(<h2 className="text-red-600 text-1xl" key={ind}>{type}</h2>))}
      </div>
<div className="flex justify-center items-center gap-2">
  <Rating className="flex justify-end" sx={{fontSize:"17px"}} name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /> 
  <p>({rating})</p>
</div>
    </div>
    <h2 className="text-gray-900 title-font text-lg font-medium hover:scale-105 duration-500 transition-all ease-in-out">
      {name} 
    </h2>
   
  </div>
</div>
        </div>
       </Link>
    )
}


export default RecipeCart