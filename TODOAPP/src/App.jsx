import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])


  const handleAddTodo = useCallback(() => {
    const todoArray = [...todos, {
      todo,
      id: Date.now(),
      completed: false
    }]

    setTodos([...todoArray])
    setTodo("")
  },[todo])


  const handleOnDelete = useCallback((id)=>{
    console.log("id", id)
    const filter = todos.filter(data=> data.id !== id)
    console.log(filter)
    setTodos([...filter])
  })


   const handleToggleTodo = useCallback((id)=>{
    console.log("Id on lcicking todo", id)
    const todoArr = [...todos]
    const todoInd = todoArr.findIndex(data=> data.id == id)
    todoArr[todoInd].completed = !todoArr[todoInd].completed
setTodos([...todoArr])
    
    
  }, [todos])


  
  return (
    <div className='flex  flex-col items-center h-screen'>
      <h1 className='font-bold text-3xl'>Todo App</h1>
      <TodoInput
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onClick={handleAddTodo}
      />
      <TodoList 
      todos={todos}
       onDelete={handleOnDelete} 
       toggleTodo={handleToggleTodo}/>
    </div>
  )
}

export default App
