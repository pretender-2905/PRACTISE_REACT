import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"




function ReactFormUsingHook() {



    const SignUp = z.object({
        email: z.string().email({ message: "Kindly Enter a Valid Email Address" }),
        password: z.string().min(8, { message: "Password should me minimum 8 characters" }),
        confirmPassword: z.string().min(8, { message: "Confirm Password should be same as Password" })
    }).superRefine(({ password, confirmPassword }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                message: "Confirm Password should be same as Password"
            })
        }
    })

    const { watch,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting } }
        = useForm({
            resolver: zodResolver(SignUp)
        })


  const post = ()=> new Promise((resolve, reject)=>{
    setTimeout(() => {
            resolve()
    }, 500);
  })

    function onSubmit(data) {
        console.log("Data=>", data)
        post(data).then(() => {
            console.log("Data submitted successfully")
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Thank You!<br>Your Form has been Submitted",
                showConfirmButton: false,
                timer: 1500
            });
            reset()
        })
    }



    return (


        <div className="flex justify-center items-center h-screen bg-purple-100">
            <div className="flex flex-col bg-gray-100 shadow-lg max-w-md p-5 w-full border rounded-lg pt-20 pb-20 border-purple-600">
                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="font-chapri text-center text-4xl drop-shadow-md text-purple-600">Hook Form</h1>
                    <div className="flex flex-col gap-1">
                        <input
                            {...register("email")}
                            placeholder="Enter Your Email"
                            className="border rounded-md p-3 border-purple-600 focus:border-yellow-400 focus:outline-none"
                            type="email"
                        />

                        {errors["email"] ?
                            (
                                <span className="text-red-600">{errors["email"].message}</span>
                            ) : null}
                    </div>
                    <div className="flex flex-col gap-1">
                        <input
                            type="password"
                            {...register("password")}
                            className="border rounded-md p-3 border-purple-600 focus:border-yellow-400 focus:outline-none"
                            placeholder="Enter Your Password"
                        />
                        {errors["password"] ?
                            (
                                <span className="text-red-600">{errors["password"].message}</span>
                            ) : null}
                    </div>
                    <div className="flex flex-col gap-1">
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="Enter Confirm Password"
                            className="border rounded-md p-3 border-purple-600 focus:border-yellow-400 focus:outline-none"
                        />

                        {errors["confirmPassword"] ?
                            (
                                <span className="text-red-600">{errors["confirmPassword"].message}</span>
                            ) : null}
                    </div>


                    <input
                        value={isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                        type="submit"
                        className="border rounded-md p-3 bg-purple-600 text-white hover:scale-105 hover:transition-all hover:duration-500 hover:ease-in-out hover:bg-purple-800 focus:border-yellow-400 focus:outline-none cursor-pointer"
                    />


                </form>
            </div>
        </div>
    )
}

export default ReactFormUsingHook