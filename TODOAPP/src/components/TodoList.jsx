function TodoList({todos}){
    return(
        <div>
            {
      todos.map((todo, index)=> {
        return(
          <div key={todo.id} className='flex gap-30 bg-slate-50'>
            <h3 className='text-left pl-3 py-2 text-2xl font-mono font-medium flex-1' >{todo.todo}</h3>
            <button className=' cursor-pointer bg-red-200 rounded-sm p-2 px-4'>Delete Todo</button>
          </div>
        )
      })
    }
        </div>
    )
}


export default TodoList