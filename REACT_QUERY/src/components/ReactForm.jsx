import { useEffect, useState } from "react"

function ReactForm(){


    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPasswrod] = useState("")

    function onSubmit(e){
        e.preventDefault()
        const obj = {
            
                email: email,
            password: password
        
        }
        console.log(obj)
    }

useEffect(()=>{
    const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

if(validateEmail(email)){
    setEmailError(null)
}else{
    setEmailError("Email is not valid")
}
},[email])

    return(
        <div>
            <div className="flex p-10 flex-col">
           <form onSubmit={onSubmit} className="flex justify-spaceBetween flex-col gap-5">
        <div className="flex flex-col gap-1">    
             <input 
             onChange={(e)=> setEmail(e.target.value)}
             value={email}
            className="border p-3 border-purple-600 rounded-md"
            required
            type="email"
            placeholder="Enter Email"
            />
          
                {
                emailError ?
                (
                     <span className="text-red-600"> Email is not valid </span>
                ):
                (
                     null
                )
}
</div>
           
            <input 
            onChange={(e)=>  setPasswrod(e.target.value)}
            value={password}
            className="border p-3 border-purple-600 rounded-md"
            required
            type="password"
            placeholder="Enter Password"
            />
            <input 
            className= "hover:bg-purple-800 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out btn cursor-pointer border p-3 border-purple-600 bg-purple-400 text-white rounded-md"
            required
            type="submit"
            value="Submit"
            

            
            />
           </form>
            </div>
        </div>
    )
}

export default ReactForm