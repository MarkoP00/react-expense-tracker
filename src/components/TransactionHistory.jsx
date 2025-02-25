const TransactionHistory = ({
  transactions,
  selectedMonth,
  onRemoveTransaction,
}) => {
  console.log(transactions);

  return (
    <div className="bg-white shadow-md rounded-lg w-11/12 md:w-2/3 lg:w-1/2 mb-6 p-6">
      <div className="border-b-2 border-gray-300 pb-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-700">History</h3>
      </div>
      {!transactions[selectedMonth] && <p className="text-gray-600">No transactions added</p>}
      <ul>
        {transactions[selectedMonth]?.map(({ id, text, amount }) => (
          <li
            key={id}
            className={`flex justify-between items-center py-2 px-4 mb-2 shadow-sm border-1 border-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200 cursor-pointer ${
              amount < 0
                ? "border-r-red-500 border-2"
                : "border-r-green-500 border-2"
            }`}
            onClick={() => onRemoveTransaction(id)}>
            <span className="text-gray-700">{text}</span>
            <span
              className={`font-bold ${
                amount < 0 ? "text-red-500" : "text-green-500"
              }`}>
              {amount}€
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
