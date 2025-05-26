function TodoInput({onChange,onClick , value}) {
    return (

        <div>

            

            <div className='my-3'>
                <input
                // value={value}
                onChange={onChange}
               
                    className='border rounded-sm p-2'
                    placeholder='Add Task' />

                <button 
                 onClick={onClick}
                 className='p-2 px-3 ml-2 rounded-sm bg-teal-200 cursor-pointer'>Add</button>
            </div>
        </div>
    )
}

export default TodoInput