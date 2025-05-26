import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { use } from 'react'


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([
    {
      todo: "Reading Book",
      id: Date.now(),
      completed: false
    }
  ])
  

  return (
   <div className='flex  flex-col items-center h-screen'>
    <h1 className='font-bold text-3xl'>Todo App</h1>
    <TodoInput
    value={todo}
    onChange={(e)=> console.log(e)}
    onClick={()=> console.log("Clicked on Aadd To Do Button")}
  
    />
    <TodoList todos={todos} />
   </div>
  )
}

export default App
