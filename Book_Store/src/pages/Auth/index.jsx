import { Link } from "react-router-dom"

function index(){
    return(
        <div>
        <div className="flex justify-center items-center flex-col">
            <p className="border bg-black text-white px-30 py-10 rounded-md text-3xl">WELCOME TO AUTH PAGE</p>
            <div className="mt-5 flex flex-row gap-6">
            <Link className="border bg-green-500 text-white px-10 py-5" to={'signup'}>Sign Up</Link>
            <Link className="border bg-green-500 text-white px-10 py-5" to={'signin'}>Sign In</Link>
            </div>
        </div>
         </div>
    )
}

export default index