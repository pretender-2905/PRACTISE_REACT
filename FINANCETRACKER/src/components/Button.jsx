import React from "react"
function Button({label , borderColor, bgColor, textColor}) {
    console.log(label)
    return (
        <button
            className={`
            border ${borderColor ? borderColor : "border-blue-400" } 
            ${bgColor ?  bgColor : "bg-red-400"}
             ${textColor? textColor: "text-black"} 
             rounded-md p-3 m-4 py-3 px-10  text-2xl`}>
           {label}
        </button>
    )
}

export default Button