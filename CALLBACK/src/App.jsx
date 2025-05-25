import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCallback } from 'react'

// notes
// useCALLBACK -> is a hook that cache a function
// useMEMO -> is a hook that cache a result

// for eg:

function App() {
  const [count, setCount] = useState(0)
  const randomNum = useMemo(()=>   Math.random() * 10000, [])
  const randomNumFun = useCallback(()=>   Math.random() * 10000, [])
// console.log("randomNum:", randomNum)
// console.log("randomNumFun:", randomNumFun)
// console.log("Array: ", array)
const array = useMemo(()=> Array.from({length: 20000000}, (_,i) => i * 10) , [])
const obj = useMemo(()=> ( {
  name: "ibrahim",
  age: 19
}), []) 

function calculateTotal (){

  console.log("calling slow function")
  return array.reduce((num, sum)=> num + sum , 0)
} 

const num1 = useMemo(()=> calculateTotal(), [obj, array])

// use memo
const num = useMemo(()=> Math.round(Math.random()* 10000), []) 
// const num =  Math.round(Math.random()* 10000) 
  return (
    <>
    
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>{num1}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
