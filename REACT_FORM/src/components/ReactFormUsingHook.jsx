import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"


function ReactFormUsingHook() {


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(data) {
        console.log("DATA=> ", data)
    }

    // useEffect(() => {
    //     const validateEmail = (email) => {
    //         return String(email)
    //             .toLowerCase()
    //             .match(
    //                 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //             );
    //     };

    //     if (validateEmail(email)) {
    //         setEmailError(null)
    //     } else {
    //         setEmailError("Email is not valid")
    //     }
    // }, [email])

    return (
        <div className="flex justify-center items-center">
            <div className="flex p-10 flex-col w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="flex justify-spaceBetween flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <input
                           {...register("email", {required: true})  }
                            className="border p-3 border-purple-600 rounded-md"
                            type="email"
                            placeholder="Enter Email"
                        />

                        {errors["email"] ?
                                (<span className="text-red-600">Please enter a valid email`</span>): null}
                                
                        
                    </div>

                   <div className="flex flex-col gap-1">
                     <input
                        {...register("password", {required :"true" , minLength: 8 })}
                        className="border p-3 border-purple-600 rounded-md"
                        type="password"
                        placeholder="Enter Password"
                    />
                    {errors["password"] ?
                        (<span className="text-red-600">Password minimum length should be 8</span> ): null}
                   </div>


                 <div className="flex flex-col gap-1">
                        <input 
                        {...register("confirmPassword",
                             {required: true,
                              validate : (value)=> value == watch("password")
                             })} 
                              className="border p-3 border-purple-600 rounded-md"
                              placeholder="Enter Confirm Password"
                             />

                    {errors["confirmPassword"] ?
                        (
                            <span className="text-red-600">Confirm Passwords should be same the Password</span>
                        ) : null}
                    


                 </div>








                    <input
                        className="hover:bg-purple-800 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out btn cursor-pointer border p-3 border-purple-600 bg-purple-400 text-white rounded-md"
                        required
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        </div>
    )
}

export default ReactFormUsingHook