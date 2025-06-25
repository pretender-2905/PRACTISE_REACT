import { useContext } from "react"
import { userContext } from "../context/userContext"

function Home(){

  const {user, setUser} = useContext(userContext)
    return(
    <div>
  <div className="flex justify-center items-center">
    <h1 className="border border-black px-110 py-40 w-80 font-bold text-4xl">
      HOME PAGE Hello <br /> {user.name}</h1>
</div>
    </div>
    )
}
export default Home