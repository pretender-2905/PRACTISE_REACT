import { useEffect, useState} from 'react'
import './App.css'
import Card from './components/Card'

// use useEffect
function App() {



return(
  <div>
    <h1>SHOPPING LIST</h1>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      
  <Card />
    </div>
  </div>
</section>

  </div>
)
  
}

export default App

// notes
// useEffect(setup, dependencies)

// syntax
// useEffect(()=> {}, [])
//use effect do arguments leta hai, aik setup aur doosra dependencies, setup matlab function, jo hum run kr waty hain usee effect mai, aur dependency matalb [].
