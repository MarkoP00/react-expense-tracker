import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Spinner from "./components/Spinner";
import UserBalance from "./components/UserBalance";
import TransactionHistory from "./components/TransactionHistory";
import AddTransaction from "./components/AddTransaction";
import ButtonSlider from "../src/components/ButtonSlider";
import addTransactionFunction from "./services/AddTransactions";
import removeTransactionFromBase from "./services/RemoveTransaction";
import callToast from "./services/CallToast";
import getTransactions from "./services/GetTransactions";
import GlobalPopup from "./components/GlobalPopup";
import { useState, useEffect } from "react";

const App = () => {
  const [allTransactions, setAllTransactions] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("january");
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const [userBalance, setUserBalance] = useState(0);
  const [userExpenses, setUserExpenses] = useState(0);
  const [userIncome, setUserIncome] = useState(0);

  const [loading, setLoading] = useState(true);

  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    getAllTransactions();
  }, []);

  function changeSelectedMonth(month) {
    setSelectedMonth(month);
  }

  function calculateUserBalances() {
    let totalExpenses = 0;
    let totalIncome = 0;

    allTransactions[selectedMonth]?.forEach(({ amount }) => {
      if (amount < 0) {
        totalExpenses += amount;
      } else {
        totalIncome += amount;
      }
    });

    const totalBalance = (totalIncome + totalExpenses).toFixed(2);

    setUserBalance(totalBalance);
    setUserExpenses(totalExpenses);
    setUserIncome(totalIncome);
  }

  async function getAllTransactions() {
    try {
      const transactions = await getTransactions();
      if (transactions) {
        setAllTransactions(transactions);
      }
    } catch (error) {
      callToast("error", "An error occured");
    } finally {
      setLoading(false);
    }
  }

  async function addTransaction(text, amount) {
    setLoading(true);
    const newTransaction = { text, amount };

    try {
      const response = await addTransactionFunction(
        newTransaction,
        selectedMonth
      );

      if (response) {
        // doing fetch again because of transaction ID
        getAllTransactions();
      }
    } catch (error) {
      callToast("error", "Error while adding transaction");
    } finally {
      setLoading(false);
    }
  }

  async function removeTransaction(id) {
    setLoading(true);
    try {
      const response = await removeTransactionFromBase(id, selectedMonth);

      if (response) {
        setAllTransactions((prevState) => ({
          ...prevState,
          [selectedMonth]: [
            ...prevState[selectedMonth]?.filter((item) => item.id !== id),
          ],
        }));
      }
    } catch (error) {
      callToast("error", "Error while removing transaction");
    } finally {
      setLoading(false);
    }
  }

  const confirmRemoveTransaction = (id) => {
    setSelectedTransactionId(id);
    setPopupTitle("Confirm Delete");
    setPopupMessage("Are you sure you want to delete this transaction?");
  };

  const handleConfirmDelete = () => {
    if (selectedTransactionId) {
      removeTransaction(selectedTransactionId);
    }
    closePopup();
  };

  const closePopup = () => {
    setPopupTitle("");
    setPopupMessage("");
    setSelectedTransactionId(null);
  };

  useEffect(() => {
    calculateUserBalances();
  }, [allTransactions]);

  useEffect(() => {
    calculateUserBalances();
  }, [selectedMonth]);

  return (
    <>
      {loading && (
        <section className="fixed w-full min-h-full flex justify-center items-center bg-black bg-opacity-15 z-20">
          <Spinner />
        </section>
      )}

      {popupTitle && (
        <GlobalPopup
          title={popupTitle}
          message={popupMessage}
          onEvent={handleConfirmDelete}
          onClose={closePopup}
          defaultPopup={false}
        />
      )}

      <section className="min-h-screen w-full flex flex-col items-center bg-gray-100 py-8">
        <h1 className="text-3xl font-bold text-gray-700 ">Expense Tracker</h1>
        <h3 className="mb-4 text-xl text-gray-700">
          ({selectedMonth.toUpperCase()})
        </h3>

        <UserBalance
          balance={userBalance}
          expenses={userExpenses}
          income={userIncome}
        />
        <ButtonSlider onChangeSelectedMonth={changeSelectedMonth} />
        <TransactionHistory
          transactions={allTransactions}
          selectedMonth={selectedMonth}
          onRemoveTransaction={confirmRemoveTransaction}
        />
        <AddTransaction onAddTransaction={addTransaction} />
        <ToastContainer />
      </section>
    </>
  );
};

export default App;
