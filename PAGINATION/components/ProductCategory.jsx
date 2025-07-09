function ProductCategory({ category, isChoosen, onClick }) {

    const { name } = category
    return (
        <div>
            <div
                onClick={onClick}
                className={`${isChoosen ? "bg-purple-600 text-white hover:bg-purple-800" : "bg-white text-black hover:bg-purple-100"}  border px-5 p-2 border-purple-600 text-black text-1xl  cursor-pointer rounded-md`}>
                {name}
            </div>
        </div>
    )
}

export default ProductCategory