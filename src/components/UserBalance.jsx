import React from "react";

const UserBalance = ({ balance, expenses, income }) => {
  return (
    <div className="bg-white shadow-md rounded-lg w-11/12 md:w-2/3 lg:w-1/2 mb-6 p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-700">Your Balance</h3>
        <span
          className={`text-4xl font-bold ${
            balance >= 0 ? "text-green-600" : "text-red-500"
          }`}>
          {balance}€
        </span>
      </div>

      <div className="flex justify-center shadow-md bg-gray-100 p-4 rounded-lg">
        <div className="text-center m-auto">
          <span className="block text-sm text-gray-600 font-bold">INCOME</span>
          <p className="text-2xl font-bold text-green-500">
            {income.toFixed(2)}€
          </p>
        </div>
        {/* vertical line */}
        <div className="border-l border-gray-300 mx-4"></div>{" "}
        <div className="text-center m-auto">
          <span className="block text-sm text-gray-600 font-bold">EXPENSE</span>
          <p className="text-2xl font-bold text-red-500">
            {expenses.toFixed(2)}€
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserBalance;
