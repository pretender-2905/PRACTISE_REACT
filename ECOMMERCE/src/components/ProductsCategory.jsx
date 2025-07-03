function ProductsCategory({category, isChoosen, onClick}){

    const {name} = category
    return(
        <div 
        onClick={onClick}
        className={`${isChoosen? "bg-purple-500 text-white hover:bg-purple-800" : "bg-white text-black"} p-2 px-4 border border-purple-400 rounded-md cursor-pointer hover:bg-purple-100`}>
            {name}
            
        </div>
    )
}

export default ProductsCategory