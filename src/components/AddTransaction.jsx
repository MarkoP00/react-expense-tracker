import React from "react";
import callToast from "../services/CallToast";
import { useState } from "react";
import { toast } from "react-toastify";

const AddTransaction = ({ onAddTransaction }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text && amount) {
      onAddTransaction(text, +amount);
      setText("");
      setAmount(0);
    } else {
      callToast("warning", "Please, check all fields!");
    }
  };

  return (
    <section className="bg-white shadow-md rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
      <div className="border-b-2 border-gray-300 pb-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-700">
          Add New Transaction
        </h3>
      </div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="transactionName"
            className="block text-gray-600 mb-2">
            Name
          </label>
          <input
            type="text"
            id="transactionName"
            autoComplete="off"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            placeholder="Enter text..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="transactionAmount"
            className="block text-gray-600 mb-2">
            Amount (negative-expense / positive-income)
          </label>
          <input
            type="number"
            id="transactionAmount"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            Add Transaction
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTransaction;
