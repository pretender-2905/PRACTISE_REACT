function ProductsCategory({category, onClick, isChoosen}){
    const {name} = category
    return(
        <div className="flex flex-wrap justify-center items-center cursor-pointer">
        
            <div
            onClick={onClick} 
            className={`${isChoosen ? " bg-purple-600 text-white hover:bg-purple-800" : "bg-white text-black hover:bg-purple-100"} border p-2 px-6 rounded-md`}>
            {name}
            </div>
        </div>
    )
}

export default ProductsCategory