import { useEffect, useState } from "react"
import React from "react";

import { fetchTodos } from "./utils/todos";



function App() {

  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetchTodos()
      .then((data) => {
        setTodos(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
        console.log("ERROR FROM FETCH TODOS", error)

      })
    if (error) {
      return (
        <h1 className="text-center text-2xl text-red-600">Sorry we can't fetch data right now!!</h1>
      )
    }
  }, [])

  return (


    <div className="flex justify-center items-center">

      <div className="flex flex-col border border-purple-600 w-full max-w-md p-8 bg-purple-200">
        <div className="flex gap-5 mb-4">
          <input className="p-3 w-full  border border-purple-600 focus:outline-none focus:border-yellow-500" />
          <button className="p-2 px-5 border-none bg-purple-500 text-white cursor-pointer hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-105">Add</button>
        </div>
        {error ?
          (
            <h1>{error}</h1>
          ) : null}

        {loading ?
          (
            <h1 className="text-green-900 text-2xl">loading....</h1>
          ) : null}


        {
          todos.map((data, ind) => {
            return (
              <h1 className="border border-purple-600 p-3" key={ind}>{data}</h1>
            )
          })
        }
      </div>

    </div>
  )
}

export default App