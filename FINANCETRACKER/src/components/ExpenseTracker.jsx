function ExpenseTracker({
    setAmount,
    setType,
    transactions,
    handleAddTransaction,
    amount,
    type
 })
    
    {

    const totalIcome = transactions.reduce(
    (acc, transaction) =>
      transaction.type == 'income' ? acc + Number(transaction.amount) : acc,
    0
  );
  const totalExpense = transactions.reduce(
    (acc, transaction) =>
      transaction.type == 'expense' ? acc + Number(transaction.amount) : acc,
    0
  );

  const balanceAmount = totalIcome - totalExpense
    return (
        <div className='flex flex-col justify-center items-center'>

            <div className='flex gap-4 my-4'>
                <div className='p-2 px-5 rounded-md border border-purple-600'>
                    <h1>Total Income</h1>
                    <h1 className='text-green-600 font-bold'>{totalIcome}</h1>
                </div>
                <div className='p-2 px-5 rounded-md border border-purple-600'>
                    <h1>Total Expense</h1>
                    <h1 className='text-red-600 font-bold '>{totalExpense}</h1>
                </div>
                <div className='p-2 px-5 rounded-md border border-purple-600'>
                    <h1>Balance</h1>
                    <h1 className={`font-bold ${balanceAmount < 0 ? 'text-red-600' : 'text-green-600'}`}>{balanceAmount}</h1>
                </div>
            </div>
            <div className='flex'>
                <input
                    onChange={(e) => setAmount(e.target.value)}
                    className='border rounded-md border-purple-600 mx-2 p-1'
                    placeholder='Add Amount'
                    type="number"
                    value={amount}
                />

                <select
                    onChange={(e) => setType(e.target.value)}
                    className='border rounded-md border-purple-600 mx-2 p-1'
                    value={type}>

                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <button
                    onClick={handleAddTransaction}
                    className='border rounded-md border-purple-600 mx-2 px-2 p-1'>Submit
                </button>
            </div>

            <div>
                {
                    transactions.map((data, index) => {
                        return (

                            <div key={index} className='flex items-center my-3'>

                                <h1 className='font-bold underline text-3xl w-70'>{index + 1}{')'}{data.amount}</h1>
                                <h1 className={`font-bold underline text-3xl 
                ${data.type === "income" ? "text-green-400" : "text-red-400"}`}
                                >{data.type}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExpenseTracker