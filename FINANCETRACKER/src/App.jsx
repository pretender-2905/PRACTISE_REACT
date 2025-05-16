import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import landingPageData from './constants/webData'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'



function App() {
  console.log(useState("muhammd ibrahim"))
  console.log("lampagedata", landingPageData)
  const { header, hero, features, testimonials } = landingPageData

  const [userName, setUserName] = useState("Muhammd")
  const [counter, setCounter] = useState(0)
 
// ----------
  // username function
  let number = 0
  // const handleUpdateUserName = () => {
  //   number++;
  //   setUserName("Muhammd Ibrahim Najam");
  //    console.log("number variable in function: ", number)
  // };
// -----------
  // counter function
  const handleUpdateCounter = () => {
  setCounter(counter + 1);
  };

  // console.log("user name from state: ", userName);
  // console.log("numer variable: ", number);

  return (
    <div>
      <Header header={header} />
      <div className='flex justify-center items-center flex-col'>
        <h2>{counter}</h2>
        {/* <button onClick={handleUpdateUserName}>Update Username</button> */}
        <button className='border border-blue-400 p-3' onClick={handleUpdateCounter}>Update counter</button>
      </div>
      <Hero hero={hero} />
      <Features features={features} />
      <Testimonials testimonials={testimonials} />
      <Footer header={header} />
    </div>


  )
}

export default App







//use state is a react hook that lets you add the state variable to your components
//react hook are simple javascript functions starting with use, here are some built in hooks(usestate, useeffect..) and you can make your own hook


// why neeed of use statehook?

// jab hum react mai component re render krty hain to function ke variables ki value reset ho jati hai:
// to react me value update kr wany ke lia humy 2 kaam krny hain

// 1) aik aisa variable banai jo data retain karay between renders(means: keepin the data safe bw renders)
// 2)  aur aik aisa function banai (i.e state setter function) jo ke value ko upate kary aur react ko trigger kary ke wo component ko re render karay


// the use state retu the curent state and sa set fucntoin
