import { useContext } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"

function Header(){

  const {theme , setTheme} = useContext(ThemeContext)
    return(
        <div>
            <header className={`${theme == "light" ? "bg-white text-gray-600": "bg-gray-800 text-white" }`}>
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span className={`${theme == "light" ? "text-black": "text-white"} ml-3 text-xl`}>Tailblocks</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a className="mr-5 hover:text-gray-900"><Link to={'/'}>Home</Link></a>
      <a className="mr-5 hover:text-gray-900"><Link to={'contact'}>Contact</Link></a>
      <a className="mr-5 hover:text-gray-900"><Link to={'about'}>About</Link></a>
      <a className="mr-5 hover:text-gray-900"><Link to={'notFound'}>Not Found</Link></a>
      <a className="mr-5 hover:text-gray-900"><Link to={'auth'}>Auth</Link></a>
    </nav>
    <button
      onClick={()=> 
      {
        if(theme == "light"){
          setTheme("dark")
        }else{
          setTheme("light")
        }
      }
      }
    className=
      {`${theme == "light" ? "text-black": "text-blue-800" } inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0`}>
      {theme == "light" ? "Make it Dark" : "Make it light"}
      
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-4 h-4 ml-1"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</header>

        </div>
    )
}

export default Header