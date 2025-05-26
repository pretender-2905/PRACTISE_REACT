

function TodoInput({value, onClick, onChange}) {

    return (

        <div>
            <div className='my-3'>
                <input
                    value={value}
                    className='border rounded-sm p-2'
                    placeholder='Add Task'
                    onChange={onChange} />


                <button
                    disabled={value === ""}
                    onClick={onClick}
                    style={{ background: value === "" && "gray" }}
                    className='p-2 px-3 ml-2 rounded-sm bg-teal-200 cursor-pointer'>
                    Add
                </button>
            </div>
        </div>
    )
}

export default TodoInput