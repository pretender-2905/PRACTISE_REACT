import { useEffect, useState } from "react"
import React from "react";

import { addTodos, fetchTodos } from "./utils/todos";
import { useMutation, useQuery } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



function App() {

  const [todo, setTodo] = useState([])
  const {data = [], refetch, isError, isLoading, error} = useQuery({
    queryKey: ['todos'], queryFn: fetchTodos
  })
const mutation = useMutation({
  mutationFn: ()=> {
    return addTodos(todo)
  },
  isSuccess: ()=>{
    refetch(), setTodo('')
  }
})

  
    if (isError) {
      return (
        <h1 className="text-center text-2xl text-red-600">Sorry we can't fetch data right now!!</h1>
      )
    }
  

  return (


    <div className="flex justify-center items-center">

      <div className="flex flex-col border border-purple-600 w-full max-w-md p-8 bg-purple-200">
        <div className="flex gap-5 mb-4">
          <input value={todo} onChange={(e)=> setTodo(e.target.value) } className="p-3 w-full  border border-purple-600 focus:outline-none focus:border-yellow-500" />
          <button
          onClick={()=> {
            mutation.mutate(todo)
          }}
          className="p-2 px-5 border-none bg-purple-500 text-white cursor-pointer hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-105">Add</button>
        </div>
        {
          mutation.isPending ?
          (
            <div>Adding todo...</div>
          ):
          null
        }
        {
          mutation.isError ?
          (
            <div>An error occured: {mutation.error.message}</div>
          ):null}
          {
            mutation.isSuccess ?
            (<div>Todo added successfully!!!</div>): null
          }
        {isLoading ? 
          (
            <h1>{error}</h1>
          ) : null}

        {isLoading ?
          (
            <h1 className="text-green-900 text-2xl">loading....</h1>
          ) : null}


        {
          data.map((data, ind) => {
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