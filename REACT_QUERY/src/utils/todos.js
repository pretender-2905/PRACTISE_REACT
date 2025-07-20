const todos = ["Take a Bath", "Get ready for uni", "At 1:00 pm apply for jobs on indeed", "4:00 hit the gym", "6:00 pm study/assignments"]

export const fetchTodos = ()=> new Promise((resolve, reject)=>{
   setTimeout(()=>{
    resolve(todos)
    // reject("some thing went wrong oops!!!!!!!!!")
   }, 1000)
})

export const addTodos = (todo)=> new Promise((resolve, reject)=>{
    setTimeout(()=>{
        todos.push(todo)
        resolve([...todos])
    }, 1000)
})