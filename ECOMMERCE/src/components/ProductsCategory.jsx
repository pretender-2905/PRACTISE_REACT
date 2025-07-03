function ProductsCategory({category}){

    const {name} = category
    return(
        <div className="p-2 px-4 border border-purple-400 rounded-md cursor-pointer hover:bg-purple-100">
            {name}
        </div>
    )
}

export default ProductsCategory