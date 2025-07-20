export const fetchRecipies = async () => {
  const response = await fetch('https://dummyjson.com/recipes');
  if (!response.ok) throw new Error("Not able to fetch recipes API!");
  return response.json();
};


export const fetchRecipeByCategory = async (id)=>{
         const res = await fetch(`https://dummyjson.com/recipes/${id}`)
          if(!res.ok) throw new Error("Not able to fetch single recipe API")
          return res.json()
}