function FilterButton({filter, setFilter}){
   return(
     <div className='flex justify-around items-center gap-6'>
         <button onClick={()=>setFilter('All')} className= {`${filter == 'All' ? "bg-teal-600 text-white"  : "bg-teal-100"} p-2 px-4 rounded-sm cursor-pointer`}>All</button>
         <button onClick={()=>setFilter('Completed')} className= {`${filter == 'Completed' ? "bg-teal-600 text-white" : "bg-teal-100"} p-2 px-4 rounded-sm cursor-pointer`}>Completed</button>
         <button onClick={()=>setFilter('UnCompleted')} className= {`${filter == 'UnCompleted' ? "bg-teal-600 text-white" : "bg-teal-100"} p-2 px-4 rounded-sm cursor-pointer`}>UnCompleted</button>
      </div>
   )
}

export default FilterButton