function Input({input, setInput, addTodo}) {
    return (

        <div className="flex justify-center items-center flex-col">
            <h1 className="text-black font-bold text-5xl  color-blue-500 mt-3 mb-5">Todo List</h1>

            <div
                className="flex justify-center items-center gap-5">
                <input
                    value={input}
                    onChange={(e)=> setInput(e.target.value) }
                    className="border-2 border-black pl-2 pr-7 py-2"
                    placeholder="Add a task..."
                    type="text" />
                <button className="border-2 bg-black text-white  px-6 py-2 cursor-pointer">Add</button>
            </div>
        </div>
    )
}

export default Input