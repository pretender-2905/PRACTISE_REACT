import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/input'

function App() {
  const [input, setInput] = useState()
  // const[to]


console.log("input", input)



  const addToDo = () => {

  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='border-3 rounded-xl border-black bg-gray-200 w-110 h-130'>
        <Input input={input} setInput={setInput} addTodo={addToDo} />
      </div>
    </div>
  )
}

export default App
