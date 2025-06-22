import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ContactUs from './pages/ContactUs'
import About from './pages/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
<ContactUs/>
<About/>
  </div>
  )
}

export default App
