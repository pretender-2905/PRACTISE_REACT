import Button from "./Button"

function Header({header}){
return(
  
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src={header.logo} className='h-12 w-12 rounded-full' />
            <span className="ml-3 text-xl">{header.title}</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">Contact Us</a>
            <a className="mr-5 hover:text-gray-900">About Us</a>

          </nav>
          <Button label={"Login"} bgColor={"bg-black"} textColor={"text-white"} borderColor={"border-blue-400"}/>
        </div>
      </header>
)
}

export default Header